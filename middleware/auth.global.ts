import {useUserStore} from '../stores/user'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = {
    accessToken: useUserStore().accessToken,
    refreshToken: useUserStore().refreshToken,
  };

  const adminPath = []

  const checkValidity: Function = async () => {
    let tokenValidity: boolean = false

    await tokenFetch(`/api/user/check`, {
      method: 'post',
      headers: {
        userorization: user.accessToken
      },
      onResponse({request, response, options}) {
        if (response.status === 204) {
          tokenValidity = true
        }
      },
    })

    return tokenValidity
  }

  let loggedPath = false
  if (adminPath.length > 0) {
    for (const path of adminPath) {
      if (to.path.split('/').includes(path)) {
        loggedPath = true
      }
    }
  }

  if (loggedPath && !(await checkValidity())) {
    useUserStore().logout()
    return navigateTo('/')
  }
})