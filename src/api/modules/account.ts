import service from '../request'

export const loginApi = (data: object = {}) => {
  return service.post('/login', data)
}
