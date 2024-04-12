"use client";
import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/rootReducer";
import { useRouter } from "next/router";
import { logout } from "../../store/authReducer";

const MyAccount: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [userData, setUserData] = useState({
    id: 0,
    nom: "",
    prenom: "",
    email: "",
    adresse: "",
  });
  const token = useSelector((state: RootState) => state.auth.token);
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/register");
      return;
    } else {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/clients/${token.client_id}/`
          );

          if (!response.ok) {
            dispatch(logout());
            router.push("/register");
            return;
          }
          
          const user: {
            id: number;
            nom: string;
            prenom: string;
            email: string;
            adresse: string;
          } = await response.json();
          setUserData(user);
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserData();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    console.log("Updated user data:", userData);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/clients/${token.client_id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (response.ok) {
        const user: {
          id: number;
          nom: string;
          prenom: string;
          email: string;
          adresse: string;
        } = await response.json();
        setUserData(user);
        setMessage("user successfully updated");
        setIsError(false);
      } else {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.email
          ? errorResponse.email[0]
          : "Something went wrong!";
        setMessage(errorMessage);
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong!");
      setIsError(true);
    }
  };
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (confirmed) {
      try{
        const response = await fetch(`http://127.0.0.1:8000/api/clients/${token.client_id}/`,
          {
            method: "DELETE",
          }
        )
        if(response.ok){
          dispatch(logout());
          router.push('/');
        }else {
          setIsError(true);
          setMessage("something went wrong! please try later");

        }
      }catch(error){
        console.error(error);
        setMessage("Something went wrong! please try again");
        setIsError(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      {message && !isError && (
        <p className={styles.successMessage}>{message}</p>
      )}
      {message && isError && <p className={styles.dangerMessage}>{message}</p>}

      <h2 className={styles.title}>My Account</h2>
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="firstName">
            First Name:
          </label>
          <input
            className={styles.input}
            type="text"
            id="firstName"
            name="nom"
            value={userData.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="lastName">
            Last Name:
          </label>
          <input
            className={styles.input}
            type="text"
            id="lastName"
            name="prenom"
            value={userData.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="address">
            Address:
          </label>
          <input
            className={styles.input}
            type="text"
            id="address"
            name="adresse"
            value={userData.adresse}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.updateButton} onClick={handleUpdate}>
            Update Account
          </button>
          <button className={styles.deleteButton} onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
