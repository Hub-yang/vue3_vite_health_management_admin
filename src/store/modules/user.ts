import { defineStore } from 'pinia'
import { getToken, setToken, removeToken, getUserName, setUserName, removeUserName } from '@/utils/token'
import { loginApi } from '@/api/modules/account'

interface userInfo {
  username: string
  password: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '' || getToken(),
    username: '' || getUserName(),
  }),
  getters: {},
  actions: {
    login(userInfo: userInfo) {
      return new Promise<void>((resolve, reject) => {
        loginApi(userInfo)
          .then((res) => {
            if (res.code === 200) {
              const { data } = res
              this.token = data.token
              this.username = data.username
              setToken(data.token)
              setUserName(data.username)
            }
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
