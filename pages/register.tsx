import { NextPage } from "next";
import Register from "../components/register";
import Layout from "../components/common/layout";


const ShoppingCard: NextPage = () => {
  return (
    <>
        <Layout>
          <Register />
        </Layout>
    </>
  );
};
export default ShoppingCard;
