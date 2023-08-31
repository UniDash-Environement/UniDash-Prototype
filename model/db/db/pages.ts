import {dbGetInstance} from "../singleton/database";

interface page {
  id: number
  name: string
  uri: string
  icon: string
  markdown: string
}

export const pages = {
  create: async (page: page) => {
    const db = await dbGetInstance()

    return await db.run(`
        INSERT INTO pages (icon,
                           name,
                           uri,
                           markdown
        )
        VALUES (
                ?,
                ?,
                ?,
                ?
        );
    `, [
      page.icon,
      page.name,
      page.uri,
      page.markdown
    ])
  },

  read: async (id) => {
    const db = await dbGetInstance()

    return await db.get(`
      SELECT *
      FROM pages
      WHERE id = ?
    `, id) as page
  },

  readByUri: async (uri) => {
    const db = await dbGetInstance()

    return await db.get(`
      SELECT *
      FROM pages
      WHERE uri = ?
    `, uri) as page
  },

  readAll: async () => {
    const db = await dbGetInstance()

    return await db.all("SELECT * FROM pages")
  },

  update: async (page: page) => {
    const db = await dbGetInstance()

    return await db.all(`
      UPDATE pages
      SET icon         = ?,
          name         = ?,
          uri          = ?,
          markdown     = ?
      WHERE id = ?
    `, [
      page.icon,
      page.name,
      page.uri,
      page.markdown,
      page.id,
    ]) as Array<page>
  },

  delete: async (id) => {
    const db = await dbGetInstance()

    return await db.all(`
      DELETE
      FROM pages
      WHERE id = ?
    `, [id])
  }
}