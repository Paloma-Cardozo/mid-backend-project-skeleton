import db from "#configs/database.js";

const TABLE = "app_user";

export async function findUserByEmail(email) {
  const user = await db(TABLE).where({ email }).first();
  return user || null;
}

export async function createUser(name, email, passwordHash) {
  const [user] = await db(TABLE)
    .insert({
      name,
      email,
      password_hash: passwordHash,
    })
    .returning(["id", "name", "email", "created_at"]);
  return user;
}
