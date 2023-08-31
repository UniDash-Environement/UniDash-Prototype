import {users} from "../../../../model/db/db/users";
import {tokens} from "../../../../model/db/db/tokens";
import {usersRoles} from "../../../../model/db/dbLink/usersRoles";
import {adminId, checkAdminAccess, checkArgsList, visitorId} from "../../../../model/utils";
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'POST') {
    const body = await readBody(event)
    const accessToken: string = event.req.headers['userorization'];

    let errors: object = {
      statusCode: 401,
      statusMessage: 'Unuserorized',
    }

    const neededParams: Array<string | undefined> = [
      body.mail,
      body.name,
      body.pass,
    ]

    if (checkArgsList(neededParams)) {
      const useruserValue = await users.read(body.mail)

      if (!useruserValue) {
        let roleId: number = visitorId
        let accessValidity: boolean = await (async () => {
          const usersDatabase = await users.readAll()

          if (usersDatabase.length === 0) {
            roleId = adminId
          }

          return (
              await checkAdminAccess(accessToken) ||
              usersDatabase.length === 0
          )
        })()

        if (accessValidity) {
          const createUser = await users.create({
            mail: body.mail,
            password: bcrypt.hashSync(body.pass, 10),
            name: body.name,
            id: 0,
          })

          const userValue = await users.read(body.mail)
          let createUserRole
          if (roleId === adminId) {
            createUserRole = await usersRoles.create({
              userId: userValue.id,
              roleId: 1
            })

            createUserRole = await usersRoles.create({
              userId: userValue.id,
              roleId: 2
            })

            createUserRole = await usersRoles.create({
              userId: userValue.id,
              roleId: 3
            })
          }

          else {
            createUserRole = await usersRoles.create({
              userId: userValue.id,
              roleId
            })
          }

          const createUserToken = await tokens.create({
            userId: userValue.id,
            refreshToken: null,
            accessToken: null,
            expireDate: null,
          })

          if (userValue && createUserRole && createUserToken) {
            errors = {
              statusCode: 204,
              statusMessage: 'No Content'
            }
          }
        }
      }
    }

    throw createError(errors)
  }
})