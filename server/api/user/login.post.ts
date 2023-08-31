import {users} from "../../../model/db/db/users";
import {tokens} from "../../../model/db/db/tokens";
import {checkArgsList, createAccessToken, cryptString} from "../../../model/utils";
import bcrypt from 'bcryptjs'
import {randomBytes} from "crypto"

export default defineEventHandler(async (event) => {
  if (event.req.method === 'POST') {
    const body = await readBody(event)

    const neededParams: Array<string | undefined> = [
      body.mail,
      body.pass,
    ]
    let errors: object = {
      statusCode: 400,
      statusMessage: 'Bad Request',
    }

    if (checkArgsList(neededParams)) {
      const useruserValue = await users.read(body.mail)
      const passValidity: boolean = (
          useruserValue && !!bcrypt.compareSync(body.pass, useruserValue.password)
      )

      if (useruserValue && passValidity) {
        const clientIp = event.req.headers['x-forwarded-for'] || ''
        const refreshToken: string = randomBytes(64).toString('hex')
        const accessToken: string = createAccessToken(
            await useruserValue.id,
            body.mail,
            body.name,
            clientIp,
        )

        const tineNow: Date = new Date(Date.now())

        tokens.update({
          userId: useruserValue.id,
          refreshToken: cryptString(refreshToken + clientIp),
          accessToken: cryptString(accessToken),
          expireDate: new Date(tineNow.setHours(tineNow.getHours() + 12))
        })

        return {
          accessToken,
          refreshToken,
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