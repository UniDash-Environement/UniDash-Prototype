import {dbGetInstance} from "../singleton/database";

interface role {
  id: number
  name: string
  roleGroupId: number
}

export const roles = {
  create: async (role: role) => {
    const db = await dbGetInstance()
    return await db.run(`
      INSERT INTO roles (name,
                         roleGroupId)
      VALUES (?,
              ?)
    `, [
      role.name,
      role.roleGroupId,
    ])
  },

  read: async (id) => {
    const db = await dbGetInstance()

    return await db.get(`
      SELECT *
      FROM roles
      WHERE id = ?
    `, id)
  },

  readAll: async () => {
    const db = await dbGetInstance()

    return await db.all("SELECT * FROM roles")
  },

  update: async (role: role) => {
    const db = await dbGetInstance()

    return await db.all(`
      UPDATE roles
      SET name        = ?,
          roleGroupId = ?
      WHERE id = ?
    `, [
      role.name,
      role.roleGroupId,
      role.id,
    ])
  },

  delete: async (id: number) => {
    const db = await dbGetInstance()

    return await db.all(`
      DELETE
      FROM roles
      WHERE id = ?
    `, [id])
  }
}