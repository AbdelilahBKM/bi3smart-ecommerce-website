import Style from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import formImage from "../../public/assets/images/form-image.png";

export default function Login() {
  return (
    <main className={Style.main}>
      <div className={Style.image}>
        <Image
          className={Style["form-image"]}
          src={formImage}
          width={805}
          height={706}
        />
      </div>
      <div className={Style.form}>
        <div className={Style.container}>
          <div className={Style["form-header"]}>
            <h2>Login to exclusive</h2>
            <p>Enter your details below</p>
          </div>
          <form className={Style["register-form"]} action="">
            <div className={Style["form__group"]}>
                <input className={Style["form__field"]} placeholder="Email or Phone Number" type="text" required/>
            </div>
            <div className={Style["form__group"]}>
                <input className={Style["form__field"]} placeholder="Password" type="password" required/>
            </div>
            <div className={Style["form__group"]}>
                <input className={Style["form__field"]} type="submit" value="Log in" required/>
            </div>
          </form>
          <div className={Style.link}>
            Don't have an Account? <span className={Style.login}><Link href={"/register"}>Register</Link></span>
          </div>
        </div>
      </div>
    </main>
  );
}
