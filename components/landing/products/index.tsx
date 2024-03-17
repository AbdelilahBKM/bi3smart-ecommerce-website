"use client";
import Product from "./product";
import Styles from "./style.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "../../common/Title";
import { Products } from "../../../utils/objects";

function ProductList() {
  const [products, setProducts] = useState<Products[]>([]); // Specify Product[] as the type

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <section className={Styles.products} id="products">
        <Title>Our Products</Title>
        <div className={`flex ${Styles.products__container}`}>
          {products.map((product) => (
            <Product
              key={product.id}
              image={{ src: product.image, alt: product.category }}
              name={product.title}
              price={`${product.price}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductList;
