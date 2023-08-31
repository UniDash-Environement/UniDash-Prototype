import {createPinia, defineStore} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

interface userResult {
  accessToken: string | null
  refreshToken: string | null
}

export const useUserStore = defineStore('user', {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    logged: false,
    adminAccess: false,
  }),
  actions: {
    define(loginInfo: userResult) {
      if (loginInfo.accessToken && loginInfo.refreshToken) {
        this.accessToken = loginInfo.accessToken
        this.refreshToken = loginInfo.refreshToken
        this.logged = true
      }
    },
    defineAdminAccess(adminAccess) {
      this.adminAccess = adminAccess
    },
    logout() {
      this.accessToken = null
      this.refreshToken = null
      this.logged = false
      this.adminAccess = false
    }
  },
  persist: true,
})