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
  } = useForm();

  const onSubmit = async (e) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e),
      });
      const body = await response.json();

      if (response.ok) {
        // login success
        console.log("Login successful");
        console.log(body);
      } else {
        // login failed
        console.log(body.error.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formField}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              {...register("username", {
                required: "Username is required",
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

          <button type="submit">Submit</button>
        </form>
        <p>
          Not registered?{" "}
          <Link href="/register">
            <a>Sign Up!</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
