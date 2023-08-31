import {users} from "../../../model/db/db/users";
import {tokens} from "../../../model/db/db/tokens";
import {checkArgsList, createAccessToken, cryptString} from "../../../model/utils";

export default defineEventHandler(async (event) => {
  if (event.req.method === 'POST') {
    const body = await readBody(event)

    let errors: object = {
      statusCode: 400,
      statusMessage: 'Bad Request',
    }
    const neededParams: Array<string | undefined> = [
      body.refreshToken,
    ]

    if (checkArgsList(neededParams)) {
      const clientIp = event.req.headers['x-forwarded-for'] || ''
      const refreshTokenValue = await tokens.read(cryptString(body.refreshToken + clientIp))
      let expired: boolean = false

      if (await refreshTokenValue && new Date(await refreshTokenValue.expireDate) <= new Date(Date.now())) {
        await tokens.update({
          ...refreshTokenValue,
          refreshToken: null,
          accessToken: null,
          expireDate: null,
        })

        expired = true
      }

      if (await refreshTokenValue && !expired) {
        const useruserValue = await users.readById(refreshTokenValue.userId)

        const accessToken: string = await createAccessToken(
            useruserValue.id,
            useruserValue.mail,
            useruserValue.name,
            clientIp,
        )

        tokens.update({
          ...refreshTokenValue,
          accessToken: cryptString(accessToken),
        })

        return {
          accessToken
        }
      }

      errors = {
        statusCode: 401,
        statusMessage: 'Unuserorized',
      }
    }

    throw createError(errors)
  }
})