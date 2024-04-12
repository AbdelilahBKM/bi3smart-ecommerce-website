import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import ChatInterface from "../../landing/chat/ChatInterface";
interface props {
  children: React.ReactNode;
}

const Layout = ({ children }: props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <ChatInterface />
      <Footer />
    </>
  );
};

export default Layout;
