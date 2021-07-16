import Head from "next/head";
import { useForm } from "react-hook-form";
import Layout from "../components/layout";
import styles from "../styles/authforms.module.css";
import { useState } from "react";
import useUser from "../lib/useUser";

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const [apiError, setAPIError] = useState("");
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const onSubmit = async ({ username, password }) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const body = await response.json();

      if (response.ok) {
        // registration success
        setAPIError("");
        mutateUser(body);
      } else {
        // registration failed
        setAPIError(body.error.message);
      }
    } catch (e) {
      // request failed
      console.log(e);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <div className={styles.container}>
        <h2>Register</h2>
        {apiError && <p className={styles.apiError}>{apiError}</p>}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formField}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 2,
                  message: "Username must be at least 2 characters long",
                },
                pattern: {
                  value: /^[A-Za-z0-9]+$/i,
                  message: "Username can only contain letters and numbers",
                },
              })}
              type="text"
            />
            <p className={styles.error}>
              {errors.username && errors.username.message}
            </p>
          </div>

          <div className={styles.formField}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              {...register("password", {
                required: "Password is required",
              })}
              type="password"
            />
            <p className={styles.error}>
              {errors.password && errors.password.message}
            </p>
          </div>

          <div className={styles.formField}>
            <label htmlFor="confirmedpw">Confirm Password</label>
            <input
              id="confirmedpw"
              {...register("confirmedpw", {
                required: "Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              type="password"
            />
            <p className={styles.error}>
              {errors.confirmedpw && errors.confirmedpw.message}
            </p>
          </div>

          <button type="submit" onClick={handleSubmit(onSubmit)}>
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}
