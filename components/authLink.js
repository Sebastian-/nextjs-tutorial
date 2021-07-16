import useUser from "../lib/useUser";
import fetchJSON from "../lib/fetchJSON";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AuthLink() {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  const isAuthPage =
    router.pathname === "/login" || router.pathname === "/register";

  if (isAuthPage) return null;

  return !user?.isLoggedIn ? (
    <Link href="/login">
      <a>Log In</a>
    </Link>
  ) : (
    <a
      href="/api/logout"
      onClick={async (e) => {
        e.preventDefault();
        mutateUser(await fetchJSON("/api/logout", { method: "POST" }), false);
        router.push("/");
      }}
    >
      Logout
    </a>
  );
}
