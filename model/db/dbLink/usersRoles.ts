import {dbGetInstance} from "../singleton/database";

interface link {
  userId: number
  roleId: number
}

export const usersRoles = {
  create: async (link: link) => {
    const db = await dbGetInstance()
    return await db.run(`
      INSERT INTO usersRoles (userId,
                              roleId)
      VALUES (?,
              ?)
    `, [
      link.userId,
      link.roleId,
    ])
  },

  read: async (link: link) => {
    const db = await dbGetInstance()

    return await db.get(`
      SELECT *
      FROM usersRoles
      WHERE userId = ?
        AND roleId = ?
    `, [
      link.userId,
      link.roleId,
    ])
  },

  readAllByRoleId: async (userId: number) => {
    const db = await dbGetInstance()

    return await db.all(`
      SELECT *
      FROM usersRoles
      WHERE roleId = ?
    `, [userId])
  },

  readAllByUserId: async (userId: number) => {
    const db = await dbGetInstance()

    return await db.all(`
      SELECT *
      FROM usersRoles
      WHERE userId = ?
    `, [userId])
  },

  update: async (link: link) => {
    const db = await dbGetInstance()

    return await db.all(`
      UPDATE usersRoles
      SET userId = ?,
          roleId = ?
      WHERE userId = ?
        AND roleId = ?
    `, [
      link.userId,
      link.roleId,
      link.userId,
      link.roleId,
    ])
  },

  delete: async (link: link) => {
    const db = await dbGetInstance()

    return await db.all(`
      DELETE
      FROM usersRoles
      WHERE userId = ?
        AND roleId = ?
    `, [
      link.userId,
      link.roleId,
    ])
  }
}