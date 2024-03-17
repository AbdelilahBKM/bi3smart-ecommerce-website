"use client";
import Product from "./product";
import Styles from "./style.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "../../common/Title";
import { Products } from "../../../utils/objects";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import img from "C:/Users/omarj/OneDrive/Documents/GitHub/nextjs-simple-ecommerce/components/landing/products/p2.png";

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
  interface CategoryImages {
    [key: string]: string;
  }

  const categoryImages: CategoryImages = {
    electronics:
      "https://media.product.which.co.uk/prod/images/original/22a475e555d7-best-laptop-deals.jpg",
    "men's clothing":
      "https://www.next.sg/nxtcms/resource/blob/5791600/d114a8023263017f86b11c206949508e/shackets-data.jpg",
    jewelery:
      "https://st.depositphotos.com/3006519/4596/i/450/depositphotos_45960861-stock-photo-gold-jewelry.jpg",
    "women's clothing":
      "https://www.gap.com/Asset_Archive/GPWeb/content/0019/235/630/assets/fall2020_email_capture2_520x693[1].jpg",
    // Add more categories and their images here if needed
  };

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
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "50px",
          }}
        >
          {categories.map((category, index) => (
            <Card className={Styles.products_cat}>
              <Image
                className={Styles.products_catIMG}
                src={categoryImages[category]}
                width={140}
                height={130}
                key={index}
                onClick={() => filterProductsByCategory(category)}
              />
              <span className={Styles.categoryName}>{category}</span>
            </Card>
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
