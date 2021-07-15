import users from "./mock-users";

export default async function handler(req, res) {
  const { username, password } = await req.body;

  if (users[username]?.password === password) {
    const response = { id: users[username].id, username };
    return res.status(200).json(response);
  } else {
    return res
      .status(401)
      .json({ error: { status: 401, message: "Invalid Login" } });
  }
}
