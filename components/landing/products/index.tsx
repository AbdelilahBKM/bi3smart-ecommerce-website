"use client";
import Product from "./product";
import Styles from "./style.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "../../common/Title";
import { Products } from "../../../utils/objects";
import Image from "next/image";
import { ST } from "next/dist/shared/lib/utils";

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

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
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
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div>
      <section className={Styles.products} id="products">
        <Title>Our Products</Title>
        <div
        className={Styles.categories}>
          {categories.map((category, index) => (
            <div key={index} className={Styles.products_cat}>
              <Image
                src={categoryImages[category]}
                width={140}
                height={130}
                key={index}
                onClick={() => filterProductsByCategory(category)}
              />
            </div>
          ))}
        </div>
        <div className={`flex ${Styles.products__container}`}>
          {filteredProducts.map((product) => (
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
