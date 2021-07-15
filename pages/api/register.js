import { addUser, getUserData } from "../../lib/users";

export default async function handler(req, res) {
  const { username, password } = await req.body;
  const { users } = getUserData();

  if (username.length < 2 || !username.match(/^[A-Za-z0-9]+$/i)) {
    return res
      .status(400)
      .json({ error: { status: 400, message: "Invalid username format" } });
  } else if (users.hasOwnProperty(username)) {
    return res
      .status(400)
      .json({ error: { status: 400, message: "Username unavailable" } });
  } else {
    const newUser = addUser(username, password);
    return res.status(200).json(newUser);
  }
}
