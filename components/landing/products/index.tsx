// ProductList.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./product";
import Styles from "./style.module.css";
import Title from "../../common/Title";
import Image from "next/image";
import { Products, Categorie } from "../../../utils/objects";

interface CategoryImages {
  [key: string]: string;
}

const categoryImages: CategoryImages = {
  1: "/assets/images/monitor.png",
  2: "/assets/images/man.png",
  3: "/assets/images/necklace.png",
  4: "/assets/images/woman.png",
};

function ProductList() {
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchedProducts, setSearchedProducts] = useState<Products[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/produits/")
      .then((response) => {
        setProducts(response.data);
        setSearchedProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    axios
      .get("http://127.0.0.1:8000/api/categories/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

      console.log(products, categories)
  }, []);

  const filterProductsByCategory = (category: number) => {
    setSelectedCategory(category);
    filterProducts(category, searchQuery, minPrice, maxPrice);
  };

  const filterProducts = (
    category: number | null,
    query: string,
    minPrice: number | null,
    maxPrice: number | null
  ) => {
    let filtered = [...products];
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(lowercaseQuery)
      );
    }
    if (minPrice !== null) {
      filtered = filtered.filter((product) => product.price >= minPrice);
    }
    if (maxPrice !== null) {
      filtered = filtered.filter((product) => product.price <= maxPrice);
    }
    setSearchedProducts(filtered);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setMinPrice(isNaN(value) ? null : value);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setMaxPrice(isNaN(value) ? null : value);
  };

  const handleSearch = () => {
    filterProducts(selectedCategory, searchQuery, minPrice, maxPrice);
  };

  const handleGoButtonClick = () => {
    filterProducts(selectedCategory, searchQuery, minPrice, maxPrice);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as "asc" | "desc");
    sortProducts(event.target.value as "asc" | "desc");
  };

  const sortProducts = (order: "asc" | "desc") => {
    const sorted = [...searchedProducts].sort((a, b) => {
      if (order === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setSearchedProducts(sorted);
  };

  return (
    <div>
      <section className={Styles.products} id="products">
        <Title>Our Products</Title>

        <div className={Styles.categories}>
          {categories.map((category, index) => {
            const id_categorie = category.Id_categorie;
            return (
              <div
                key={index}
                className={Styles.products_cat}
                onClick={() => filterProductsByCategory(id_categorie)}
              >
                <div className={Styles.centerImage}>
                  <Image
                    src={categoryImages[id_categorie]}
                    width={130}
                    height={130}
                    className={Styles["product-img"]}
                  />
                </div>

                <div className={Styles.categoryName}>{category.nom_categorie}</div>
              </div>
            );
          })}
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
        <div className={(Styles.priceFilter, Styles.searchBarContainer)}>
          <input
            type="number"
            value={minPrice || ""}
            onChange={handleMinPriceChange}
            placeholder="Min Price"
            className={Styles.priceInput}
          />
          <span className={Styles.priceSeparator}>-</span>
          <input
            type="number"
            value={maxPrice || ""}
            onChange={handleMaxPriceChange}
            placeholder="Max Price"
            className={Styles.priceInput}
          />
          <button onClick={handleGoButtonClick} className={Styles.goButton}>
            Go
          </button>
        </div>
        <div>
          <label htmlFor="sort" className={Styles.dropdownButton}>
            Sort by Price:
          </label>
          <select
            id="sort"
            onChange={handleSortChange}
            className={Styles.dropdownContent}
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
        <div className={`flex ${Styles.products__container}`}>
          {searchedProducts.map((product) => (
            <Product
              key={product.id}
              image={{ src: product.image, alt: "" }}
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
