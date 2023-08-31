import {dbGetInstance} from "../singleton/database";

interface link {
  roleId: number
  roleGroupId: number
}

export const rolesRolesGroups = {
  create: async (link: link) => {
    const db = await dbGetInstance()
    return await db.run(`
      INSERT INTO rolesRolesGroups (roleId,
                                    roleGroupId)
      VALUES (?,
              ?)
    `, [
      link.roleId,
      link.roleGroupId,
    ])
  },

  read: async (roleId: number, roleGroupId: number) => {
    const db = await dbGetInstance()

    return await db.get(`
      SELECT *
      FROM rolesRolesGroups
      WHERE roleId = ?
        AND roleGroupId = ?
    `, [roleId, roleGroupId])
  },

  readAllByRoleGroupId: async (roleGroupId: number) => {
    const db = await dbGetInstance()

    return await db.all(`
      SELECT *
      FROM rolesRolesGroups
      WHERE roleGroupId = ?
    `, [roleGroupId])
  },

  readAllByRoleId: async (roleId: number) => {
    const db = await dbGetInstance()

    return await db.all(`
      SELECT *
      FROM rolesRolesGroups
      WHERE roleId = ?
    `, [roleId])
  },

  update: async (link: link) => {
    const db = await dbGetInstance()

    return await db.all(`
        UPDATE rolesRolesGroups
        SET roleId      = ?,
            roleGroupId = ?
        WHERE roleId = ?
          AND roleGroupId = ?
    `, [
      link.roleId,
      link.roleGroupId,
      link.roleId,
      link.roleGroupId,
    ])
  },

  delete: async (roleId: number, roleGroupId: number) => {
    const db = await dbGetInstance()

    return await db.all(`
      DELETE
      FROM rolesRolesGroups
      WHERE roleId = ?
        AND roleGroupId = ?
    `, [
      roleId,
      roleGroupId,
    ])
  }
}