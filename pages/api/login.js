import { isValidAuth } from "../../lib/users";
import withSession from "../../lib/withSession";

export default withSession(async (req, res) => {
  const { username, password } = await req.body;

  if (isValidAuth(username, password)) {
    const user = { username };
    req.session.set("user", user);
    await req.session.save();
    res.status(200).json(user);
  } else {
    res.status(401).json({ error: { status: 401, message: "Invalid Login" } });
  }
});
