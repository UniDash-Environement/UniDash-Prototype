import {dbGetInstance} from "../singleton/database";

interface link {
  pageGroupId: number
  roleGroupId: number
}

export const pagesGroupsRolesGroups = {
  create: async (link: link) => {
    const db = await dbGetInstance()
    return await db.run(`
        INSERT INTO pagesGroupsRolesGroups (pageGroupId,
                                            roleGroupId)
        VALUES (?,
                ?)
    `, [
      link.pageGroupId,
      link.roleGroupId,
    ])
  },

  read: async (link: link) => {
    const db = await dbGetInstance()

    return await db.get(`
      SELECT *
      FROM pagesGroupsRolesGroups
      WHERE pageGroupId = ? AND
            roleGroupId = ?
    `, [
      link.pageGroupId,
      link.roleGroupId,
    ])
  },

  readAllByRoleGroupId: async (roleGroupId: number) => {
    const db = await dbGetInstance()

    return await db.all(`
      SELECT *
      FROM pagesGroupsRolesGroups
      WHERE roleGroupId = ?
    `, [roleGroupId])
  },

  readAllByPageGroupId: async (pageGroupId: number) => {
    const db = await dbGetInstance()

    return await db.all(`
      SELECT *
      FROM pagesGroupsRolesGroups
      WHERE pageGroupId = ?
    `, [pageGroupId])
  },

  update: async (link: link) => {
    const db = await dbGetInstance()

    return await db.all(`
        UPDATE pagesGroupsRolesGroups
        SET pageGroupId = ?,
            roleGroupId = ?
        WHERE pageGroupId = ?
          AND roleGroupId = ?
    `, [
      link.pageGroupId,
      link.roleGroupId,
      link.pageGroupId,
      link.roleGroupId,
    ])
  },

  delete: async (link: link) => {
    const db = await dbGetInstance()

    return await db.all(`
      DELETE
      FROM pagesGroupsRolesGroups
      WHERE pageGroupId = ? AND
            roleGroupId = ?
    `, [
      link.pageGroupId,
      link.roleGroupId,
    ])
  }
}