import {request} from '../request/index'
export function getCategories() {
  return request({
    url: '/categories',
    method: 'get'
  })
}
