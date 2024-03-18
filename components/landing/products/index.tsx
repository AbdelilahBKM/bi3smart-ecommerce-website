// ProductList.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./product";
import Styles from "./style.module.css";
import Title from "../../common/Title";
import Image from "next/image";
import { Products } from "../../../utils/objects";

interface CategoryImages {
  [key: string]: string;
}

const categoryImages: CategoryImages = {
  electronics: "/assets/images/monitor.png",
  "men's clothing": "/assets/images/man.png",
  jewelery: "/assets/images/necklace.png",
  "women's clothing": "/assets/images/woman.png",
};

function ProductList() {
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchedProducts, setSearchedProducts] = useState<Products[]>([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setSearchedProducts(response.data); // Initialize searched products with all products
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const filterProductsByCategory = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery("");
    filterProducts(selectedCategory, searchQuery);
  };

  const filterProducts = (category: string | null, query: string) => {
    let filtered = products;
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (query) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    setSearchedProducts(filtered);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    filterProducts(selectedCategory, searchQuery);
  };

  return (
    <div>
      <section className={Styles.products} id="products">
        <Title>Our Products</Title>

        <div className={Styles.categories}>
          {categories.map((category, index) => (
            <div
              key={index}
              className={Styles.products_cat}
              onClick={() => filterProductsByCategory(category)}
            >
              <div className={Styles.centerImage}>
                <Image
                  src={categoryImages[category]}
                  width={130}
                  height={130}
                  className={Styles["product-img"]}
                />
              </div>

              <div className={Styles.categoryName}>{category}</div>
            </div>
          ))}
        </div>
        <div className={Styles.searchBarContainer}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search..."
            className={Styles.searchBar}
          />
          <button onClick={handleSearch} className={Styles.searchButton}>
            Search
          </button>
        </div>
        <div className={`flex ${Styles.products__container}`}>
          {searchedProducts.map((product) => (
            <Product
              key={product.id}
              image={{ src: product.image, alt: product.category }}
              name={product.title}
              price={`${product.price}$`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductList;
