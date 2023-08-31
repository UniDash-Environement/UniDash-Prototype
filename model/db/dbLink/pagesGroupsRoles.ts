import {dbGetInstance} from "../singleton/database";

interface link {
  pageGroupId: number
  roleId: number
}

export const pagesGroupsRoles = {
  create: async (link: link) => {
    const db = await dbGetInstance()
    return await db.run(`
      INSERT INTO pagesGroupsRoles (pageGroupId,
                                    roleId)
      VALUES (?,
              ?)
    `, [
      link.pageGroupId,
      link.roleId,
    ])
  },

  read: async (link: link) => {
    const db = await dbGetInstance()

    return await db.get(`
      SELECT *
      FROM pagesGroupsRoles
      WHERE pageGroupId = ?
        AND roleId = ?
    `, [
      link.pageGroupId,
      link.roleId,
    ])
  },

  readAllByRoleId: async (roleId: number) => {
    const db = await dbGetInstance()

    return await db.all(`
      SELECT *
      FROM pagesGroupsRoles
      WHERE roleId = ?
    `, [roleId])
  },

  readAllByPageGroupId: async (pageGroupId: number) => {
    const db = await dbGetInstance()

    return await db.all(`
      SELECT *
      FROM pagesGroupsRoles
      WHERE pageGroupId = ?
    `, [pageGroupId])
  },

  update: async (link: link) => {
    const db = await dbGetInstance()

    return await db.all(`
      UPDATE pagesGroupsRoles
      SET pageGroupId = ?,
          roleId      = ?
      WHERE pageGroupId = ?
        AND roleId = ?
    `, [
      link.pageGroupId,
      link.roleId,
      link.pageGroupId,
      link.roleId,
    ])
  },

  delete: async (link: link) => {
    const db = await dbGetInstance()

    return await db.all(`
      DELETE
      FROM pagesGroupsRoles
      WHERE pageGroupId = ?
        AND roleId = ?
    `, [
      link.pageGroupId,
      link.roleId,
    ])
  }
}