import {pages} from "../../../model/db/db/pages";
import {checkAdminAccess, checkArgsList} from "../../../model/utils";

interface page {
  id: number
  name: string
  uri: string
  icon: string
  markdown: string
  roleId: number
  pagesGroupId: number | null
}

export default defineEventHandler(async (event) => {
  if (event.req.method === 'POST') {
    const accessToken: string = event.req.headers['userorization'];
    const body = await readBody(event)

    let errors: object = {
      statusCode: 401,
      statusMessage: 'Unuserorized',
    }

    const neededParams: Array<string | undefined> = [
      body.id,
      body.name,
      body.icon,
      body.markdown
    ]

    if (await checkAdminAccess(accessToken) && checkArgsList(neededParams)) {
      const pageInfo = await pages.read(body.id)

      if (pageInfo) {
        await pages.update({
          id: body.id,
          name: body.name || pageInfo.name,
          uri: `${body.name
              .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
              .map(x => x.toLowerCase())
              .join('-')}-${body.id}` || pageInfo.uri,
          icon: body.icon || pageInfo.icon,
          markdown: body.markdown || pageInfo.markdown,
        })

        errors = {
          statusCode: 204,
          statusMessage: 'No Content',
        }
      }
    }

    throw createError(errors)
  }
})