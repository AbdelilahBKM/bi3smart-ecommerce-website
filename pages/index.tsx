import type { NextPage } from "next";
import Hero from "../components/landing/hero";
import About from "../components/landing/about";
import Products from "../components/landing/products";
import Subscribe from "../components/landing/subscribe";
import Contact from "../components/landing/contact";
import Layout from "../components/common/layout";
import { ProductContext } from "../context/productContext";
import SEO from "../components/common/SEO";
import ChatInterface from "../components/landing/chat/ChatInterface";

const Home: NextPage = () => {
  return (
    <>
      <SEO title="ecommerce app" />
      <ProductContext>
        <Layout>
          <Hero />
          <About />
          <Products />
          <Subscribe />
          <Contact />
          <ChatInterface />
        </Layout>
      </ProductContext>
    </>
  );
};

export default Home;
