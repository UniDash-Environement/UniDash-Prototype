import {defineStore} from 'pinia'
import {tokenFetch} from "../.nuxt/imports";

export const usePagesStore = defineStore('pages', {
  state: () => {
    const roles = []
    const rolesGroups = []
    const pages = []

    return {
      pages,
      roles,
      rolesGroups,
      reloaded: true,
    }
  },
  actions: {
    async refreshPagesByRole(roleId) {
      this.pages = []
      let defineStore = false

      const result = await tokenFetch('/api/pages/get/byRole', {
        method: 'post',
        body: {
          roleId
        },
        onResponse({request, response, options}) {
          if (response.status === 200) {
            defineStore = true
          }
        },
      })

      if (defineStore) {
        this.pages = result
        this.reloaded = !this.reloaded
      }

      return this.pages
    },
    async refreshPagesByRoleGroup(roleGroupId) {
      this.pages = []
      let defineStore = false

      const result = await tokenFetch('/api/pages/get/byRoleGroup', {
        method: 'post',
        body: {
          roleGroupId
        },
        onResponse({request, response, options}) {
          if (response.status === 200) {
            defineStore = true
          }
        },
      })

      if (defineStore) {
        this.pages = result
        this.reloaded = !this.reloaded
      }

      return this.pages
    },
    getPages() {
      return this.pages
    },
    async refreshRolesGroups() {
      this.rolesGroups = []
      let defineStore = false

      const result = this.rolesGroups = await tokenFetch('/api/user/get/rolesGroups', {
        onResponse({request, response, options}) {
          if (response.status === 200) {
            defineStore = true
          }
        },
      })


      if (defineStore) {
        this.rolesGroups = result
        this.reloaded = !this.reloaded
      }

      return this.rolesGroups
    },
    getRolesGroups() {
      return this.rolesGroups
    },
    async refreshRoles() {
      this.roles = []
      let defineStore = false

      const result = this.roles = await tokenFetch('/api/user/get/roles', {
        onResponse({request, response, options}) {
          if (response.status === 200) {
            defineStore = true
          }
        },
      })


      if (defineStore) {
        this.roles = result
        this.reloaded = !this.reloaded
      }

      return this.roles
    },
    getRoles() {
      return this.roles
    },
    forceWatch() {
      this.reloaded = !this.reloaded
    }
  },
})