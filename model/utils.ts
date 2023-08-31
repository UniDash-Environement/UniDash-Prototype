import {tokens} from "./db/db/tokens";
import {rolesRolesGroups} from "./db/dbLink/rolesRolesGroups";
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'
import {usersRoles} from "./db/dbLink/usersRoles";
import {pagesRolesGroups} from "./db/dbLink/pagesRolesGroups";
import {pages} from "./db/db/pages";
import {pagesRoles} from "./db/dbLink/pagesRoles";
import {roles} from "./db/db/roles";
import {rolesGroups} from "./db/db/rolesGroups";

const config = useRuntimeConfig();

export const adminId = 3
export const userId = 2
export const visitorId = 1

export const checkArgsList = (argsList: Array<any>) => {
  return (
      !argsList.includes("") &&
      !argsList.includes(undefined) &&
      !argsList.includes(null) &&
      !argsList.includes([]) &&
      !argsList.includes({})
  )
}

export const checkAccessToken: Function = async (accessToken: string | null, clientIp: string) => {
  const accessTokenValidity = jwt.verify(accessToken, config.SECRET, (err, decoded) => {
    return !err
  })
  const accessTokenValue = await (async () => {
    let result = null
    if (accessTokenValidity) {
      result = await tokens.readAccess(cryptString(accessToken))
    }

    return result
  })()
  const tokenContent = (() => {
    let result = null
    if (accessTokenValidity) {
      result = jwt.verify(accessToken, config.SECRET)
    }

    return result
  })()

  return {
    validity: (accessTokenValidity && !!(await accessTokenValue)),
    content: (await accessTokenValue),
    tokenContent: tokenContent,
  }
}

export const createAccessToken: Function = (
    id: number,
    mail: string,
    name: string,
    ip: string,
) => {
  return jwt.sign(
      {
        id,
        mail,
        name,
        ip,
      }, config.SECRET, {
        expiresIn: 300, // seconde
      }
  )
}

export const cryptString: Function = (string: string) => {
  return crypto.createHash("SHA256").update(string).digest("hex")
}

export const compareCryptString: Function = (string: string, cryptedString: string) => {
  return crypto.createHash("SHA256").update(string).digest("hex") === cryptedString
}

export const getUserRoles = async (accessToken) => {
  const accessTokenValue = await checkAccessToken(accessToken)
  const rolesList = []
  let usersRolesList = null

  if (accessTokenValue.validity) {
    usersRolesList = await usersRoles.readAllByUserId(accessTokenValue.content.userId)

    if (usersRolesList) {
      for (const usersRole of usersRolesList) {
        rolesList.push(await roles.read(usersRole.roleId))
      }
    }

  } else if (!accessToken) {
    rolesList.push(await roles.read(visitorId))
  }

  return rolesList
}

export const getUserRolesGroups = async (accessToken) => {
  const rolesList = await getUserRoles(accessToken)
  const rolesGroupsList = []
  let result = null

  if (rolesList) {
    const rolesRolesGroupsList = []

    for (const role of rolesList) {
      const roleRolesGroupsValue = await rolesRolesGroups.readAllByRoleId(role.id)
      for (const roleRoleGroup of roleRolesGroupsValue) {
        rolesRolesGroupsList.push(roleRoleGroup)
      }
    }

    for (const roleRoleGroup of rolesRolesGroupsList) {
      const roleGroup = await rolesGroups.read(roleRoleGroup.roleGroupId)
      let push = true

      for (const roleGroupValue of rolesGroupsList) {
        if (roleGroupValue.id === roleGroup.id) {
          push = false
        }
      }

      if (push) {
        rolesGroupsList.push(roleGroup)
      }
    }

    if (rolesGroupsList) {
      result = rolesGroupsList
    }
  }

  return result
}

export const getUserRoleGroupPages = async (accessToken, roleGroupId) => {
  const rolesGroups = await getUserRolesGroups(accessToken)
  let result = null

  if (rolesGroups) {
    const pagesList = []

    for (const roleGroup of rolesGroups) {
      if (roleGroup.id === roleGroupId) {
        const pagesRoleGroup = await pagesRolesGroups.readAllByRoleGroupId(roleGroup.id)
        for (const pageRoleGroup of pagesRoleGroup) {
          pagesList.push(await pages.read(pageRoleGroup.pageId))
        }
      }
    }

    if (pagesList) {
      result = pagesList
    }
  }

  return result
}

export const getUserRolePages = async (accessToken, roleId) => {
  const roles = await getUserRoles(accessToken)
  let result = null

  if (roles) {
    const pagesList = []

    for (const role of roles) {
      if (role.id === roleId) {
        const pagesRole = await pagesRoles.readAllByRoleId(role.id)
        for (const pageRole of pagesRole) {
          pagesList.push(await pages.read(pageRole.pageId))
        }
      }
    }

    if (pagesList) {
      result = pagesList
    }
  }

  return result
}

export const checkUserRole = async (accessToken, roleId) => {
  const roles = await getUserRoles(accessToken)
  let result = null

  if (roles) {
    for (const role of roles) {
      if (role.id === roleId) {
        result = role
      }
    }
  }

  return result
}

export const checkUserRoleGroup = async (accessToken, roleGroupId) => {
  const rolesGroups = await getUserRolesGroups(accessToken)
  let result = null

  if (rolesGroups) {
    for (const roleGroup of rolesGroups) {
      if (roleGroup.id === roleGroupId) {
        result = roleGroup
      }
    }
  }

  return result
}

export const checkAdminAccess = async (accessToken) => {
  return await checkUserRoleGroup(accessToken, adminId)
}