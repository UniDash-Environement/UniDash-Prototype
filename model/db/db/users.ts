import {dbGetInstance} from "../singleton/database";

interface user {
  id: number
  mail: string
  name: string
  password: string
}

export const users = {
  create: async (user: user) => {
    const db = await dbGetInstance()

    user = await db.run(`
      INSERT INTO users (mail,
                         name,
                         password)
      VALUES (?,
              ?,
              ?)
    `, [
      user.mail,
      user.name,
      user.password
    ])
    return user
  },

  read: async (mail) => {
    const db = await dbGetInstance()

    return await db.get(`
      SELECT *
      FROM users
      WHERE mail = ?
    `, mail) as user
  },

  readById: async (id) => {
    const db = await dbGetInstance()

    return await db.get(`
      SELECT *
      FROM users
      WHERE id = ?
    `, id) as user
  },

  readAll: async () => {
    const db = await dbGetInstance()

    return await db.all("SELECT * FROM users")
  },

  update: async (user: user) => {
    const db = await dbGetInstance()

    return await db.all(`
      UPDATE users
      SET mail     = ?,
          name     = ?,
          password = ?
      WHERE id = ?
    `, [
      user.mail,
      user.name,
      user.password,
      user.id,
    ]) as Array<user>
  },

  delete: async (id) => {
    const db = await dbGetInstance()

    return await db.all(`
      DELETE
      FROM users
      WHERE id = ?
    `, [id])
  }
}