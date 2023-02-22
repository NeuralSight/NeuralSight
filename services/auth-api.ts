import { changeObjToFormUrlencoded } from '../helper/changeObjToOtherFormats'
import { ContentType } from '../lang/content-type'
import { AuthUser } from '../typings'

const headers = new Headers({
  'Content-Type': ContentType.FormData,
})

export const loginUser = async (user: AuthUser) => {
  const urlencoded = changeObjToFormUrlencoded(user)
  // console.log('urlencoded', urlencoded)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEURALSIGHT_API_BASE_URL}/login/access-token`,
    {
      mode: 'cors',
      method: 'POST',
      headers: headers,
      body: urlencoded,
    }
  )
  // console.log('data', data)
  return response
}
