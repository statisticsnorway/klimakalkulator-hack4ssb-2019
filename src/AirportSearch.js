import React, { useEffect, useState } from 'react'
import { Icon, Search } from 'semantic-ui-react'
import { multi } from 'air-port-codes-node'

const apca = multi({
  key: '8da4440ae8',
  secret: 'd6746550b0d0f74',
  limit: 5
})

function AirportSearch ({ setAirportGps, whichWay }) {
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
      {message && <span style={{fontSize: '0.7em'}}><Icon color='orange' name='info circle' />{message}</span>}
      <Search
        placeholder={`${whichWay} flyplass`}
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
            setAirportGps({ latitude: result.latitude, longitude: result.longitude })
          }
        }
        noResultsMessage='Fant ingen...'
        fluid
        size='small'
      />
    </>
  )
}

export default AirportSearch
