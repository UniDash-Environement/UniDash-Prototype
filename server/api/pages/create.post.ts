import {pages} from "../../../model/db/db/pages";
import {checkAdminAccess, checkArgsList} from "../../../model/utils";
import {pagesRolesGroups} from "../../../model/db/dbLink/pagesRolesGroups";
import {pagesRoles} from "../../../model/db/dbLink/pagesRoles";

export default defineEventHandler(async (event) => {
  if (event.req.method === 'POST') {
    const accessToken: string = event.req.headers['userorization'];
    const body = await readBody(event)

    let errors: object = {
      statusCode: 401,
      statusMessage: 'Unuserorized',
    }
    const neededParams: Array<string | undefined> = [
      body.name,
      body.roleId,
      body.mode,
    ]

    if (await checkAdminAccess(accessToken) && checkArgsList(neededParams)) {
      const uri = `${body.name
          .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
          .map(x => x.toLowerCase())
          .join('-')}-${body.roleId}`

      await pages.create({
        id: 0,
        name: body.name,
        icon: "majesticons:pin",
        markdown: "# Blank Page",
        uri,
      })
      const createPage = await pages.readByUri(uri)

      if (createPage) {
        let createPermission
        if (body.mode === 'rolesGroups') {
          createPermission = await pagesRolesGroups.create({
            pageId: createPage.id,
            roleGroupId: body.roleId,
          })
        } else if (body.mode === 'roles') {
          createPermission = await  pagesRoles.create({
            pageId: createPage.id,
            roleId: body.roleId
          })
        }

        if (createPermission) {
          errors = {
            statusCode: 204,
            statusMessage: 'No Content',
          }
        } else {
          await pages.delete(createPage.id)
        }
      }
    }

    throw createError(errors)
  }
})