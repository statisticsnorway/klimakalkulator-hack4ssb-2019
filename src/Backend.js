import { useEffect, useState } from 'react'

const axios = require('axios').default

export const BackendApi = (query) => {
  const [doFetch, setDoFetch] = useState(false)
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const response = await axios({
          method: 'post',
          url: process.env.REACT_APP_AIR_PORT_CODES + query + '&limit=5',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'APC-Auth': '8da4440ae8',
            'APC-Auth-Secret': 'd6746550b0d0f74'
          }
        })

        setData(response)
      } catch (error) {
        setError(error.toString())
      }

      setLoading(false)
    }

    if (doFetch) {
      fetchData().then()
    }
  }, [query, doFetch])

  return [{ data, loading, error }, setDoFetch]
}
