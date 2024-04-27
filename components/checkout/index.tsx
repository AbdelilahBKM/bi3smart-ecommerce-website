import * as React from "react";
import Styles from "./style.module.css";
import StripeCheckout from "react-stripe-checkout";
import { useRouter } from "next/router";
import Product from "./product";
import { useProductContext } from "../../context/productContext";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { METHODS } from "http";
import { redirect } from "next/dist/server/api-utils";

const CheckOut = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const token = useSelector((state: RootState) => state.auth.token);
  const [clientId, setClientId] = React.useState<number>(-1);
  //const [products,setProducts] = React.useState<productInterface[]>([])
  const { products, setProducts } = useProductContext();
  const [total, setTotal] = React.useState(0);
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/register");
      return;
    }

    setClientId(token ? token.client_id : -1);
    const productsPrice = products.map((product) =>
      Number(
        product.price
          .split("")
          .filter((char) => char !== "$")
          .join("")
      )
    );
    console.log(products);
    const total = products.length
      ? productsPrice.reduce((acc, price) => acc + price)
      : 0;
    setTotal(total);
  }, [products.length]);

  const handleRemoveProduct = (idx: number) => {
    const restProducts = products.filter((_, index) => index !== idx);
    const productsPrice = restProducts.map((product) =>
      Number(
        product.price
          .split("")
          .filter((char) => char !== "$")
          .join("")
      )
    );
    if (productsPrice.length !== 0) {
      const total: number = productsPrice.reduce((acc, price) => acc + price);
      setTotal(total);
    }
    setProducts(restProducts);

    localStorage.setItem("products", JSON.stringify(restProducts));
  };

  const onToken = async () => {
    // Create order:
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/commandes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client: clientId,
          montant_total: total,
        }),
      });
      if (response.ok) {
        const command: {
          id_comm: number;
          date_comm: Date;
          client: number;
          montant_total: number;
        } = await response.json();
        await Promise.all(
          products.map(async (product) => {
            console.log(product);
            const response1 = await fetch(
              `http://127.0.0.1:8000/api/produits/${product.name}`,
              {
                method: "GET",
              }
            );
            if (response1.ok) {
              const productData = await response1.json();
              const product_id = productData.product_id;
              const response2 = await fetch(
                `http://127.0.0.1:8000/api/ligne_commandes/`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id_comm: command.id_comm,
                    id_prod: product_id,
                    Quantite: product.amount,
                  }),
                }
              );
              if (response2.ok) {
                console.log("LIGNE COMMAND CREE ");
              } else {
                throw new Error("Failed to create line command.");
              }
            }
          })
        );
        localStorage.setItem("products", JSON.stringify([]));
        router.push("/congratulation");
        
      } else {
        throw new Error("Failed to create order.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  if (products.length === 0) {
    return (
      <section className={Styles.shoppingCart}>
        <div className={Styles.empty__card}>
          <p className={`text-center ${Styles.empty__card__text}`}>
            Card is empty
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className={Styles.shoppingCart}>
      <table className={Styles.shoppingCart__table}>
        <thead className={Styles.shoppingCart__table__head}>
          <tr>
            <th className={Styles.shoppingCart__table__head__item}>product</th>
            <th className={Styles.shoppingCart__table__head__item}>quantity</th>
            <th className={Styles.shoppingCart__table__head__item}>price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <Product
              id={product.id}
              name={product.name}
              setTotal={setTotal}
              image={product.image}
              price={product.price}
              handleRemoveProduct={handleRemoveProduct}
              key={index}
              index={index}
            />
          ))}
        </tbody>
      </table>
      <div className={Styles.total}>
        <div>
          <p className={Styles.total__header}>
            total <span className={Styles.total__price}>${total}</span>
          </p>
          <StripeCheckout
            stripeKey="pk_test_4TbuO6qAW2XPuce1Q6ywrGP200NrDZ2233"
            token={onToken}
            name="Famms"
            description="Buy clothes"
            amount={total * 100}
            billingAddress
            shippingAddress
          >
            <button className="btn-primary text-bold">pay now</button>
          </StripeCheckout>
        </div>
      </div>
    </section>
  );
};

export default CheckOut;
