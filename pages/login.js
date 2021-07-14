import Head from "next/head";
import Layout from "../components/layout";
import styles from "../styles/authforms.module.css";

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.container}>
        <h2>Login</h2>
        <form>
          <div className={styles.formField}>
            <label for="username">Username</label>
            <input id="username" name="username" type="text" />
          </div>

          <div className={styles.formField}>
            <label for="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  );
}
