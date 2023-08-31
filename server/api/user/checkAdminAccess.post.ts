import {checkAdminAccess} from "../../../model/utils";

export default defineEventHandler(async (event) => {
  if (event.req.method === 'POST') {
    const body = await readBody(event)
    const accessToken: string = event.req.headers['userorization'];

    let errors: object = {
      statusCode: 401,
      statusMessage: 'Unuserorized',
    }

    let accessValidity: boolean = await (async () => {
      return await checkAdminAccess(accessToken)
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