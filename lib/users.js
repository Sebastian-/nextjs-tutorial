import fs from "fs";
import path from "path";

const usersDirectory = path.join(process.cwd(), "users");
const usersPath = path.join(usersDirectory, "mock-users.json");

/* 
{
  count: int,
  users: {
    id: int,
    [username: string]: {id: int, password: string}
  }
}
*/
export function getUserData() {
  const json = fs.readFileSync(usersPath);
  return JSON.parse(json);
}

export function addUser(username, password) {
  const userData = getUserData();
  const newUserData = {
    count: userData.count + 1,
    users: {
      ...userData.users,
      [username]: { id: userData.count + 1, password },
    },
  };
  const userJSON = JSON.stringify(newUserData);
  fs.writeFileSync(usersPath, userJSON);

  return { username, id: newUserData.users[username].id };
}
