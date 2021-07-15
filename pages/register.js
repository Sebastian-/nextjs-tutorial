import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Layout from "../components/layout";
import styles from "../styles/authforms.module.css";

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = async ({ username, password }) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // registration success
        console.log("Registration successful");
        const body = await response.json();
        console.log(body);
      } else {
        // registration failed
        const body = await response.json();
        console.log(body.error.message);
      }
    } catch (e) {
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
