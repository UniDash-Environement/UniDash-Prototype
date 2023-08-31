import {dbGetInstance} from "../singleton/database";

interface page {
  id: number
  name: string
  uri: string
  icon: string
  markdown: string
  roleId: number
}

export const pagesGroups = {
  create: async (page: page) => {
    const db = await dbGetInstance()

    return await db.run(`
      INSERT INTO pagesGroups (icon,
                               name,
                               uri,
                               roleId)
      VALUES (?,
              ?,
              ?,
              ?);
    `, [
      page.icon,
      page.name,
      page.uri,
      page.roleId
    ])
  },

  read: async (id) => {
    const db = await dbGetInstance()

    return await db.get(`
      SELECT *
      FROM pagesGroups
      WHERE id = ?
    `, id) as page
  },

  readAll: async () => {
    const db = await dbGetInstance()

    return await db.all("SELECT * FROM pagesGroups")
  },

  readAllByRole: async (roleId) => {
    const db = await dbGetInstance()

    return await db.all(`
      SELECT *
      FROM pagesGroups
      WHERE roleId = ?
    `, roleId)
  },

  update: async (page: page) => {
    const db = await dbGetInstance()

    return await db.all(`
      UPDATE pagesGroups
      SET icon   = ?,
          name   = ?,
          uri    = ?,
          roleId = ?
      WHERE id = ?
    `, [
      page.icon,
      page.name,
      page.uri,
      page.roleId,
      page.id,
    ]) as Array<page>
  },

  delete: async (id) => {
    const db = await dbGetInstance()

    return await db.all(`
      DELETE
      FROM pagesGroups
      WHERE id = ?
    `, [id])
  }
}