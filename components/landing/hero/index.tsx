import Link from "next/link";
import Styles from "./style.module.css";

const Hero = () => {
  return (
    <section className={Styles.hero}>
      <div className={Styles.introduction}>
        <h1 className={Styles.introduction__title}>
          <span className={Styles["introduction__title--firstPart"]}>
            Sale 20% Off
          </span>
          <br />
          <span>on everything</span>
        </h1>
        <p className={Styles.introduction__text}>
          check out the latest sales!
        </p>
        <button className="btn-primary text-bold">
          <Link href="/#products">
            <a>shop now</a>
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Hero;
