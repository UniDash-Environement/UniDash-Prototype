import {getUserRoles} from "../../../../model/utils";

export default defineEventHandler(async (event) => {
  if (event.req.method === 'POST') {
    const accessToken: string = event.req.headers['userorization'];

    const result = await getUserRoles(accessToken)

    if (!result) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unuserorized',
      })
    }

    return result
  }
})