import {useUserStore} from '../stores/user'
import type {UseFetchOptions} from 'nuxt/app'
import {defu} from 'defu'

export async function tokenFetch<T>(url: string, options: UseFetchOptions<T> = {}) {
  const fetch: Function = async (accessToken) => {
    let error: boolean = false

    const defaults: {
      headers: {
        userorization: null extends ShallowRef<infer V> ? V : (null extends Ref<infer V> ? UnwrapRefSimple<V> : UnwrapRefSimple<null>)
      } | {};
      method: string;
      onResponseError(_ctx): void
    } = {
      method: 'post',
      headers: accessToken
          ? {
            userorization: accessToken
          }
          : {},

      onResponseError(_ctx) {
        error = true
      }
    }

    const params = defu(options, defaults)
    const {data: fetch} = await useFetch(url, params)

    let result = fetch
    if (error) {
      result = null
    }
    return result
  }

  let result = await fetch(useUserStore().accessToken)

  if (!result && useUserStore().refreshToken) {
    let defineStore: boolean = false
    let {data: refresh} = await useFetch(`/api/user/refresh`, {
      method: 'post',
      body: {
        refreshToken: useUserStore().refreshToken,
      },
      onResponse({request, response, options}) {
        if (response.status === 200) {
          defineStore = true
        }
      },
      onResponseError({request, response, options}) {
        useUserStore().logout()
      }
    })

    if (defineStore) {
      useUserStore().define({
        accessToken: refresh['_rawValue'].accessToken,
        refreshToken: useUserStore().refreshToken,
      })

      let adminAccess = false
      await tokenFetch(`/api/user/checkAdminAccess`, {
        method: 'post',
        onResponse({request, response, options}) {
          if (response.status === 204) {
            adminAccess = true
          }
        },
        onResponseError({request, response, options}) {
        }
      })

      await useUserStore().defineAdminAccess(adminAccess)

      result = await fetch(refresh['_rawValue'].accessToken)
    }
  }

  return result
}