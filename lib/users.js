import fs from "fs";
import path from "path";

const usersDirectory = path.join(process.cwd(), "users");
const usersPath = path.join(usersDirectory, "mock-users.json");

/* 
{
    [username: string]: {password: string}
}
*/
export function getUserData() {
  const userJSON = fs.readFileSync(usersPath);
  return JSON.parse(userJSON);
}

export function addUser(username, password) {
  const userData = getUserData();
  const newUserData = {
    ...userData,
    [username]: { password },
  };
  const userJSON = JSON.stringify(newUserData);
  fs.writeFileSync(usersPath, userJSON);

  return { username };
}

export function isValidAuth(username, password) {
  const users = getUserData();
  return users[username].password === password;
}

export function isUser(username) {
  const users = getUserData();
  return users.hasOwnProperty(username);
}
