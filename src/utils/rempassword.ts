const PASSWORK_KEY = 'rempassword'

export const getPassword = () => localStorage.getItem(PASSWORK_KEY)

export const setPassword = (value: string) => localStorage.setItem(PASSWORK_KEY, value)

export const removePassword = () => localStorage.removeItem(PASSWORK_KEY)
