import {getUserRoleGroupPages} from "../../../../model/utils";

export default defineEventHandler(async (event) => {
  if (event.req.method === 'POST') {
    const body = await readBody(event)
    const accessToken: string = event.req.headers['userorization'];

    const result = await getUserRoleGroupPages(accessToken, body.roleGroupId)

    if (result.length == 0) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unuserorized',
      })
    }

    return result
  }
})