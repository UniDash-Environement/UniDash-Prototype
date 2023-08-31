import {dbGetInstance} from "../singleton/database";

interface link {
  pageId: number
  roleId: number
}

export const pagesRoles = {
  create: async (link: link) => {
    const db = await dbGetInstance()
    return await db.run(`
        INSERT INTO pagesRoles (pageId,
                                roleId)
        VALUES (?,
                ?)
    `, [
      link.pageId,
      link.roleId,
    ])
  },

  read: async (link: link) => {
    const db = await dbGetInstance()

    return await db.get(`
      SELECT *
      FROM pagesRoles
      WHERE pageId = ? AND
            roleId = ?
    `, [
      link.pageId,
      link.roleId,
    ])
  },

  readAllByRoleId: async (roleId: number) => {
    const db = await dbGetInstance()

    return await db.all(`
      SELECT *
      FROM pagesRoles
      WHERE roleId = ?
    `, [roleId])
  },

  readAllByPageId: async (pageId: number) => {
    const db = await dbGetInstance()

    return await db.all(`
      SELECT *
      FROM pagesRoles
      WHERE pageId = ?
    `, [pageId])
  },

  update: async (link: link) => {
    const db = await dbGetInstance()

    return await db.all(`
        UPDATE pagesRoles
        SET pageId = ?,
            roleId = ?
        WHERE pageId = ?
          AND roleId = ?
    `, [
      link.pageId,
      link.roleId,
      link.pageId,
      link.roleId,
    ])
  },

  delete: async (link: link) => {
    const db = await dbGetInstance()

    return await db.all(`
      DELETE
      FROM pagesRoles
      WHERE pageId = ? AND
            roleId = ?
    `, [
      link.pageId,
      link.roleId,
    ])
  }
}