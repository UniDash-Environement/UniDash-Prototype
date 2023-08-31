import {dbGetInstance} from "../singleton/database";

interface tokens {
  userId: number
  refreshToken: string | null
  accessToken: string | null
  expireDate: Date | null
}

export const tokens = {
  create: async (token: tokens) => {
    const db = await dbGetInstance()

    token = await db.run(`
      INSERT INTO tokens (refreshToken,
                                   accessToken,
                                   expireDate)
      VALUES (?,
              ?,
              ?)
    `, [
      token.refreshToken,
      token.accessToken,
      token.expireDate
    ])
    return token
  },

  read: async (refreshToken) => {
    const db = await dbGetInstance()

    return await db.get(`
      SELECT *
      FROM tokens
      WHERE refreshToken = ?
    `, [
      refreshToken,
    ])
  },

  readAccess: async (accessToken) => {
    const db = await dbGetInstance()

    return await db.get(`
      SELECT *
      FROM tokens
      WHERE accessToken = ?
    `, [
      accessToken,
    ])
  },

  readAll: async () => {
    const db = await dbGetInstance()

    return await db.all("SELECT * FROM tokens")
  },

  update: async (token: tokens) => {
    const db = await dbGetInstance()

    return await db.all(`
      UPDATE tokens
      SET refreshToken = ?,
          accessToken  = ?,
          expireDate   = ?
      WHERE userId = ?
    `, [
      token.refreshToken,
      token.accessToken,
      token.expireDate,
      token.userId,
    ])
  },

  delete: async (userId: number) => {
    const db = await dbGetInstance()

    return await db.all(`
      DELETE
      FROM tokens
      WHERE userId = ?
    `, [userId])
  }
}