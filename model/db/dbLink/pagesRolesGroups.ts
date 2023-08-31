import {dbGetInstance} from "../singleton/database";

interface link {
  pageId: number
  roleGroupId: number
}

export const pagesRolesGroups = {
  create: async (link: link) => {
    const db = await dbGetInstance()
    return await db.run(`
      INSERT INTO pagesRolesGroups (pageId,
                                    roleGroupId)
      VALUES (?,
              ?)
    `, [
      link.pageId,
      link.roleGroupId,
    ])
  },

  read: async (link: link) => {
    const db = await dbGetInstance()

    return await db.get(`
      SELECT *
      FROM pagesRolesGroups
      WHERE pageId = ?
        AND roleGroupId = ?
    `, [
      link.pageId,
      link.roleGroupId,
    ])
  },

  readAllByRoleGroupId: async (roleGroupId: number) => {
    const db = await dbGetInstance()

    return await db.all(`
      SELECT *
      FROM pagesRolesGroups
      WHERE roleGroupId = ?
    `, [roleGroupId])
  },

  readAllByPageId: async (pageId: number) => {
    const db = await dbGetInstance()

    return await db.all(`
      SELECT *
      FROM pagesRolesGroups
      WHERE pageId = ?
    `, [pageId])
  },

  update: async (link: link) => {
    const db = await dbGetInstance()

    return await db.all(`
      UPDATE pagesRolesGroups
      SET pageId      = ?,
          roleGroupId = ?
      WHERE pageId = ?
        AND roleGroupId = ?
    `, [
      link.pageId,
      link.roleGroupId,
      link.pageId,
      link.roleGroupId,
    ])
  },

  delete: async (link: link) => {
    const db = await dbGetInstance()

    return await db.all(`
      DELETE
      FROM pagesRolesGroups
      WHERE pageId = ?
        AND roleGroupId = ?
    `, [
      link.pageId,
      link.roleGroupId,
    ])
  }
}