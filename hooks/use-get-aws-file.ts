import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const fetchObject = async (file: string) => {
  try {
    const response = await fetch(`/api/get-aws-file/${file}`)
    return await response.json()
  } catch (error) {
    console.log('Error -', error)
  }
}

export default function useGetAWSfile(path: string) {
  const pathsArr = path.split('/')
  const imagePathQuery = useQuery(
    ['image', path],
    async () => await fetchObject(pathsArr[pathsArr.length - 1]),
    {
      onSuccess: () => {
        console.log('success')
      },
    }
  )

  return imagePathQuery
}
