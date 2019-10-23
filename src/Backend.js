import { useEffect, useState } from 'react'

const axios = require('axios').default

export const BackendApi = (url) => {
  const [doFetch, setDoFetch] = useState(false)
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const response = await axios(url)

        setData(response)
      } catch (error) {
        setError(error.toString())
      }

      setLoading(false)
    }

    if (doFetch) {
      fetchData().then()
    }
  }, [url, doFetch])

  return [{ data, loading, error }, setDoFetch]
}
