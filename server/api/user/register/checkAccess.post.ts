import {checkAdminAccess} from "../../../../model/utils";
import {users} from "../../../../model/db/db/users";

export default defineEventHandler(async (event) => {
  if (event.req.method === 'POST') {
    const body = await readBody(event)
    const accessToken: string = event.req.headers['userorization'];

    let errors: object = {
      statusCode: 401,
      statusMessage: 'Unuserorized',
    }

    let accessValidity: boolean = await (async () => {
      const usersDatabase = await users.readAll()
      return (
          await checkAdminAccess(accessToken) ||
          usersDatabase.length === 0
      )
    })()

    if (accessValidity) {
      errors = {
        statusCode: 204,
        statusMessage: 'No Content',
      }
    }

    throw createError(errors)
  }
})