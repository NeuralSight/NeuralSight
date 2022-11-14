import { AnyObject } from 'yup/lib/types'

export function changeObjToFormUrlencoded(obj: AnyObject) {
  var str = []
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
      console.log(key + ' -> ' + obj[key])
    }
  }
  return str.join('&')
}
