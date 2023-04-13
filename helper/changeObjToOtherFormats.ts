import { AnyObject } from '../typings'

/**
 * Converts a JavaScript object into a string with URL-encoded form data.
 *
 * @param {object} data - The JavaScript object to convert.
 * @returns {string} - A string with URL-encoded form data.
 */
export function changeObjToFormUrlencoded(obj: AnyObject): string {
  let str: string[] = []
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
      console.log(key + ' -> ' + obj[key])
    }
  }
  return str.join('&')
}

/**
 * Converts a JavaScript object with file and text data into a FormData object
 * that can be used as the body of a multipart/form-data request.
 *
 * @param {object} data - The JavaScript object to convert.
 * @returns {FormData} - The FormData object that can be used as the body of a
 *   multipart/form-data request.
 */
export function changeObjToFormData(obj: AnyObject): FormData {
  // Create a new FormData object
  let formData = new FormData()

  // Loop through the object and add each key/value pair to the FormData object
  for (let key in obj) {
    formData.append(key, obj[key])
  }

  // Return the FormData object
  return formData
}
