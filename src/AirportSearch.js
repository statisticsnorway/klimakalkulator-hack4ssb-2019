import React, { useEffect, useState } from 'react'
import { Icon, Search } from 'semantic-ui-react'
import { multi } from 'air-port-codes-node'

const apca = multi({
  key: '',
  secret: '',
  limit: 5
})

function AirportSearch () {
  const [query, setQuery] = useState('')
  const [airports, setAirports] = useState([])
  const [airport, setAirport] = useState('')
  const [message, setMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (query) {
      setIsLoading(true)
      apca.request(query)

      apca.onSuccess = (data) => {
        setAirports(data.airports.map(airport => ({
          title: airport.name,
          description: airport.country.name + ' - ' + airport.country.iso,
          image: '',
          price: airport.iata,
          longitude: airport.longitude,
          latitude: airport.latitude
        })))
        setMessage(false)
        setIsLoading(false)
        console.log('data', data)
      }

      apca.onError = (data) => {
        setMessage(data.message)
        setIsLoading(false)
      }
    }
  }, [query])

  return (
    <>
      {message && <span><Icon color='orange' name='info circle' />{message}</span>}
      <Search
        placeholder='Flyplass'
        value={airport}
        results={airports}
        loading={isLoading}
        onSearchChange={(event, { value }) => {
          setQuery(value)
          setAirport(value)
        }}
        onResultSelect={
          (event, { result }) => {
            setAirport(result.title)
          }
        }
        noResultsMessage='Fant ingen...'
        fluid
        size='big'
      />
    </>
  )
}

export default AirportSearch
