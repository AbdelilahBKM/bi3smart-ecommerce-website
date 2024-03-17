import { NextPage } from "next";
import Login from "../components/login";
import Layout from "../components/common/layout";


const ShoppingCard: NextPage = () => {
  return (
    <>
        <Layout>
          <Login />
        </Layout>
    </>
  );
};
export default ShoppingCard;
