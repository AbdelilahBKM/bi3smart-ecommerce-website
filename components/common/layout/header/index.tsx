import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import shopCard from "../../../../public/assets/images/shopCard.svg";
import Hamburger from "../../hamburger";
import Styles from "./style.module.css";
import { useProductContext } from "../../../../context/productContext";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { logout } from "../../../../store/authReducer";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showNavBar, setShowNavBar] = React.useState(false);
  const { products } = useProductContext();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const token = useSelector((state: RootState) => state.auth.token);
  console.log("token: " + token);

  return (
    <header className={Styles.header}>
      <nav className={Styles.nav}>
        <Link href="/">
          <a>
            <p className={`${Styles.logo}`}>
              <span className={`${Styles.red}`}>BI3</span>-SMART
            </p>
          </a>
        </Link>
        <ul className={`flex ${Styles.nav__list}`}>
          <li>
            <Link href="/">
              <a
                className={`${Styles.nav__link} ${
                  router.asPath === "/" ? Styles["nav__link--active"] : ""
                }`}
              >
                home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/#products">
              <a className={Styles.nav__link}>products</a>
            </Link>
          </li>
          <li>
            <Link href="/#contact">
              <a className={Styles.nav__link}>contact</a>
            </Link>
          </li>

          <li>
            {isAuthenticated ? (
              <div className={Styles.miniNav}>
                <Link href="/myAccount">
                  <a className={Styles.nav__link}>My account</a>
                </Link>
                <Link href="">
                  <a
                    onClick={() => {
                      dispatch(logout());
                      router.push("/");
                    }}
                    className={Styles.nav__link}
                  >
                    Logout
                  </a>
                </Link>
              </div>
            ) : (
              <Link href="/register">
                <a className={Styles.nav__link}>Join now</a>
              </Link>
            )}
          </li>
          <li className={Styles.shopping__card}>
            <Link href="/checkout">
              <a>
                <Image
                  src={shopCard}
                  alt="shop card logo"
                  width={17}
                  height={17}
                />
              </a>
            </Link>
            {products.length ? (
              <div className={Styles.shopping__card__productNum}>
                {products.length}
              </div>
            ) : null}
          </li>
        </ul>
        <Hamburger showNavBar={showNavBar} setShowNavBar={setShowNavBar} />
      </nav>
      <nav className={`${Styles.mobileNav} ${showNavBar ? Styles.open : ""}`}>
        <ul className={`flex ${Styles.mobileNav__list}`}>
          <li>
            <Link href="/">
              <a
                className={`${Styles.nav__link} ${
                  router.asPath === "/" ? Styles["nav__link--active"] : ""
                }`}
              >
                home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/#products">
              <a className={Styles.nav__link}>products</a>
            </Link>
          </li>
          <li>
            <Link href="/#contact">
              <a className={Styles.nav__link}>contact</a>
            </Link>
          </li>
          <li>
            <Link href="/#about">
              <a className={Styles.nav__link}>about</a>
            </Link>
          </li>
          <li className={Styles.shopping__card}>
            <Link href="/checkout">
              <a>
                <Image
                  src={shopCard}
                  alt="shop card logo"
                  width={17}
                  height={17}
                />
              </a>
            </Link>
            {products.length ? (
              <div className={Styles.shopping__card__productNum}>
                {products.length}
              </div>
            ) : null}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
