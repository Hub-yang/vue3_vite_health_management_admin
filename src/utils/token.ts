const TOKEN_KEY = 'token'
const USERNAME_KEY = 'username'

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const setToken = (value: string) => localStorage.setItem(TOKEN_KEY, value)

export const removeToken = () => localStorage.remove(TOKEN_KEY)

export const getUserName = () => localStorage.getItem(USERNAME_KEY)

export const setUserName = (value: string) => localStorage.setItem(USERNAME_KEY, value)

export const removeUserName = () => localStorage.removeItem(USERNAME_KEY)
