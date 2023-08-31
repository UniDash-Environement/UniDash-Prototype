import {dbGetInstance} from "../singleton/database";

interface role {
  id: number
  name: string
  roleGroupId: number
}

export const rolesGroups = {
  create: async (role: role) => {
    const db = await dbGetInstance()
    return await db.run(`
      INSERT INTO rolesGroups (name)
      VALUES (?)
    `, [
      role.name
    ])
  },

  read: async (id) => {
    const db = await dbGetInstance()

    return await db.get(`
      SELECT *
      FROM rolesGroups
      WHERE id = ?
    `, id)
  },

  readAll: async () => {
    const db = await dbGetInstance()

    return await db.all("SELECT * FROM rolesGroups")
  },

  update: async (role: role) => {
    const db = await dbGetInstance()

    return await db.all(`
      UPDATE rolesGroups
      SET name = ?
      WHERE id = ?
    `, [
      role.name,
      role.id,
    ])
  },

  delete: async (id: number) => {
    const db = await dbGetInstance()

    return await db.all(`
      DELETE
      FROM rolesGroups
      WHERE id = ?
    `, [id])
  }
}