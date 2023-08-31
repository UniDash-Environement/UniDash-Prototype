import {dbGetInstance} from "../singleton/database";

interface favorite {
  id: number
  name: string
  icon: string
  vueName: string
  moduleId: number
  settingsId: number
}

export const favorites = {
  create: async (favorite: favorite) => {
    const db = await dbGetInstance()

    favorite = await db.run(`
      INSERT INTO favorites (name,
                             icon,
                             vueName,
                             moduleId,
                             settingsId)
      VALUES (?,
              ?,
              ?,
              ?,
              ?)
    `, [
      favorite.name,
      favorite.icon,
      favorite.vueName,
      favorite.moduleId,
      favorite.settingsId
    ])
    return favorite
  },

  read: async (id) => {
    const db = await dbGetInstance()

    return await db.get(`
      SELECT *
      FROM favorites
      WHERE id = ?
    `, id)
  },

  readAll: async () => {
    const db = await dbGetInstance()

    return await db.all("SELECT * FROM favorites")
  },

  update: async (favorite: favorite) => {
    const db = await dbGetInstance()

    return await db.all(`
      UPDATE favorites
      SET
        name       = ?,
        icon       = ?,
        vueName    = ?,
        moduleId   = ?,
        settingsId = ?
      WHERE
        id = ?
    `, [
      favorite.name,
      favorite.icon,
      favorite.vueName,
      favorite.moduleId,
      favorite.settingsId,
      favorite.id
    ])
  },

  delete: async (id) => {
    const db = await dbGetInstance()

    return await db.all(`
      DELETE
      FROM favorites
      WHERE id = ?
    `, [id])
  }
}