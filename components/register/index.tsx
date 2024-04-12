import { useState, ChangeEvent, FormEvent } from "react";
import Style from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import formImage from "../../public/assets/images/form-image.png";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/authReducer";
import type { RootState } from "../../store/rootReducer";

export default function Register() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
    adresse: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const [registrationError, setRegistrationError] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      // Proceed with registration
      const registerResponse = await fetch(
        "http://127.0.0.1:8000/api/clients/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (registerResponse.ok) {
        const data = await registerResponse.json();
        const token = data.token;
        dispatch(login(token));
      } else {
        const data = await registerResponse.json();
        setRegistrationError(data.email || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegistrationError("Error during registration");
    }
  };

  return (
    <main className={Style.main}>
      <div className={Style.image}>
        <Image
          className={Style["form-image"]}
          src={formImage}
          alt="image"
          width={805}
          height={706}
        />
      </div>
      <div className={Style.form}>
        {!isAuthenticated ? (
          <div className={Style.container}>
            <div className={Style["form-header"]}>
              <h2>Create an account</h2>
              <p>Enter your details below</p>
            </div>
            <form className={Style["register-form"]} onSubmit={handleSubmit}>
              <div className={Style["form__group"]}>
                <input
                  className={Style["form__field"]}
                  placeholder="First Name"
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={Style["form__group"]}>
                <input
                  className={Style["form__field"]}
                  placeholder="Last Name"
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={Style["form__group"]}>
                <input
                  className={Style["form__field"]}
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {registrationError && (
                  <span style={{ color: "red" }}>{registrationError}</span>
                )}
              </div>
              <div className={Style["form__group"]}>
                <input
                  className={Style["form__field"]}
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={Style["form__group"]}>
                <input
                  className={Style["form__field"]}
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {passwordError && (
                  <span style={{ color: "red" }}>{passwordError}</span>
                )}
              </div>
              <div className={Style["form__group"]}>
                <input
                  className={Style["form__field"]}
                  placeholder="Address"
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={Style["form__group"]}>
                <input
                  className={Style["form__field"]}
                  type="submit"
                  value="Create an account"
                />
              </div>
            </form>
            <div className={Style.link}>
              Already have an Account?{" "}
              <span className={Style.login}>
                <Link href={"/login"}>Log In</Link>
              </span>
            </div>
          </div>
        ) : (
          <div>
            <div className={Style["form-header"]}>
              <h2>Welcome!</h2>
              <p>You have successfully registered.</p>
              <div className={Style["register-form"]}>
                <Link href={"/"}>
                  <input
                    className={Style["form__field"]}
                    type="submit"
                    value="Go Back"
                  />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
