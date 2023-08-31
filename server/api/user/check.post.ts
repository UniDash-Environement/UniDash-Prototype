import {checkAccessToken} from "../../../model/utils";

export default defineEventHandler(async (event) => {
  if (event.req.method === 'POST') {
    const accessToken: string = event.req.headers['userorization'];

    let errors: object = {
      statusCode: 401,
      statusMessage: 'Unuserorized',
    }

    const accessTokenValue = await checkAccessToken(accessToken)
    if (await accessTokenValue.validity) {
      errors = {
        statusCode: 204,
        statusMessage: 'No Content',
      }
    }

    throw createError(errors)
  }
})