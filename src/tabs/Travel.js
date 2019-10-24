import React, { Fragment, useEffect, useState } from 'react'
import {
  Button,
  Card,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  List,
  Segment,
  Statistic
} from 'semantic-ui-react'

import { EQUIVALENTS, TABLE_1, TABLE_2 } from '../Emissions'
import {
  calculateCo2,
  calculateMJ,
  calculateSmiley,
  distanceInKmBetweenEarthCoordinates,
  findColor,
  ICONS,
  TRANSPORT_TYPES
} from '../Utilities'
import AirportSearch from '../AirportSearch'

const travelPoint = { transportType: '', distance: 0 }

function Travel () {
  const [totalDistance, setTotalDistance] = useState(0)
  const [people, setPeople] = useState(1)
  const [airport1, setAirport1] = useState({ latitude: '', longitude: '' })
  const [airport2, setAirport2] = useState({ latitude: '', longitude: '' })
  const [travelPoints, setTravelPoints] = useState([travelPoint])
  const [total, setTotal] = useState({ co2: 0, mj: 0, color: 'green' })

  useEffect(() => {
    if (airport1.latitude !== '' && airport1.longitude !== '' && airport2.latitude !== '' && airport2.longitude !== '')
      try {
        const distanceAirports = +distanceInKmBetweenEarthCoordinates(airport1.latitude, airport1.longitude, airport2.latitude, airport2.longitude).toFixed(0)
        const newTravelPoints = JSON.parse(JSON.stringify(travelPoints))
        newTravelPoints.map(element => {
          if (element.transportType === 'Fly') {
            element.distance = distanceAirports
          }

          return element
        })

        setTravelPoints(newTravelPoints)
      } catch (error) {
        console.log(error)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airport1, airport2])

  useEffect(() => {
    const totalDist = travelPoints.reduce((sum, current) => {
      return sum + parseInt(current.distance)
    }, 0)

    setTotalDistance(totalDist)
  }, [travelPoints])

  useEffect(() => {
    const totalCo2 = +travelPoints.reduce((sum, current) => {
      if (current.transportType !== '') {
        return sum + calculateCo2(TABLE_2.data[current.transportType][3], current.distance, people)
      } else {
        return sum
      }
    }, 0).toFixed(2)

    const totalMj = +travelPoints.reduce((sum, current) => {
      if (current.transportType !== '') {
        return sum + calculateMJ(TABLE_1.data[current.transportType][3], current.distance, people)
      } else {
        return sum
      }
    }, 0).toFixed(2)

    const color = findColor(totalCo2)

    setTotal({ co2: totalCo2, mj: totalMj, color: color })
  }, [people, travelPoints])

  return (
    <Segment basic>
      <Form size='huge'>
        <Form.Field>
          <Input label={{ color: 'teal', content: 'Antall personer:' }} placeholder='Antall personer' value={people}
                 onChange={(event) => setPeople(event.target.value < 1 ? 1 : event.target.value)} fluid
                 type='number' disabled={true} />
        </Form.Field>
        {travelPoints.map((travelPoint, index) => {
            if (travelPoint.transportType === 'Fly') {
              return (
                <Fragment key={index}>
                  <Header as='h4' content={`Del ${index + 1} av ruta`} />
                  <Form.Group widths='equal'>
                    <Form.Field>
                      <Grid columns='equal'>
                        <Grid.Column>
                          <AirportSearch setAirportGps={setAirport1} whichWay='Fra' />
                        </Grid.Column>
                        <Grid.Column>
                          <AirportSearch setAirportGps={setAirport2} whichWay='Til' />
                        </Grid.Column>
                      </Grid>
                    </Form.Field>
                    <Form.Field style={{ marginTop: '0.4em' }}>
                      <Input label={{ color: 'teal', content: 'Avstand (i km):' }} placeholder='Avstand (i km)'
                             value={travelPoint.distance} readOnly={true} fluid type='number'
                      />
                    </Form.Field>
                  </Form.Group>
                </Fragment>
              )
            } else {
              return (
                <Fragment key={index}>
                  <Header as='h4' content={`Del ${index + 1} av ruta`} />
                  <Form.Group widths='equal' key={index}>
                    <Form.Field>
                      <Dropdown options={TRANSPORT_TYPES} fluid search selection value={travelPoint.transportType}
                                onChange={(event, { value }) => {
                                  const newTravelPoints = JSON.parse(JSON.stringify(travelPoints))
                                  newTravelPoints[index].transportType = value
                                  setTravelPoints(newTravelPoints)
                                }}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input label={{ color: 'teal', content: 'Avstand (i km):' }} placeholder='Avstand (i km)'
                             value={travelPoint.distance}
                             onChange={(event) => {
                               const newTravelPoints = JSON.parse(JSON.stringify(travelPoints))
                               newTravelPoints[index].distance = event.target.value < 0 ? 0 : event.target.value
                               setTravelPoints(newTravelPoints)
                             }} fluid
                             type='number' />
                    </Form.Field>
                  </Form.Group>
                </Fragment>
              )
            }
          }
        )}
      </Form>
      <Grid columns='equal'>
        <Grid.Column>
          <Button positive icon='plus' onClick={() => {
            const newTravelPoints = JSON.parse(JSON.stringify(travelPoints))
            newTravelPoints.push(travelPoint)
            setTravelPoints(newTravelPoints)
          }} />
        </Grid.Column>
        <Grid.Column>
          <Statistic color='blue' floated='right' label='Total distanse' value={totalDistance} />
        </Grid.Column>
      </Grid>
      <Divider hidden />
      <Card.Group centered stackable itemsPerRow={4}>
        {travelPoints.length !== 0 && travelPoints.map((element, index) => {
            if (element.transportType !== '') {
              const co2 = calculateCo2(TABLE_2.data[element.transportType][3], element.distance, people)
              const mj = TABLE_1.data.hasOwnProperty(element.transportType) ? calculateMJ(TABLE_1.data[element.transportType][3], element.distance, people) : 0
              const color = findColor(co2)

              return (
                <Card key={`${element.transportType}${index}`} color={color}>
                  <Card.Content>
                    <Icon name={ICONS[element.transportType]} size='huge' style={{ float: 'right' }} />
                    <Card.Header>
                      {element.transportType.includes('aa') ? element.transportType.replace('aa', 'å') : element.transportType}
                    </Card.Header>
                    <Card.Meta>{`Utslipp: `}<b>{`${co2} kg/CO`}<sub>2</sub>e</b></Card.Meta>
                    <Card.Meta>{`Energiforbruk: `}<b>{`${mj} MJ`}</b></Card.Meta>
                    <Card.Description>
                      <Divider hidden />
                      <List>
                        {EQUIVALENTS.map(element =>
                          <List.Item key={element.text}>
                            <List.Icon name={element.icon} />
                            <List.Content>
                              <List.Header>
                                {`Antall ${element.text}: ${+element.calculate((co2 / element.value)).toFixed(2)}`}
                              </List.Header>
                              <List.Description>
                                {element.description}
                              </List.Description>
                            </List.Content>
                          </List.Item>
                        )}
                      </List>
                    </Card.Description>
                  </Card.Content>
                </Card>
              )
            } else {
              return null
            }
          }
        )}
      </Card.Group>
      <Divider hidden />
      <Card.Group centered stackable itemsPerRow={3}>
        {total.co2 > 0 &&
        <Card color={total.color}>
          <Card.Content>
            <Icon.Group size='huge' style={{ float: 'right' }}>
              <Icon name='globe' style={{ color: '#143f90' }} />
              <Icon corner name={calculateSmiley(total.co2)} color={total.color} />
            </Icon.Group>
            <Card.Header>
              Totalt
            </Card.Header>
            <Card.Meta>{`Utslipp: `}<b>{`${total.co2} kg/CO`}<sub>2</sub>e</b></Card.Meta>
            <Card.Meta>{`Energiforbruk: `}<b>{`${total.mj} MJ`}</b></Card.Meta>
            <Card.Description>
              <Divider hidden />
              <List>
                {EQUIVALENTS.map(element =>
                  <List.Item key={element.text}>
                    <List.Icon name={element.icon} />
                    <List.Content>
                      <List.Header>
                        {`Antall ${element.text}: ${+element.calculate((total.co2 / element.value)).toFixed(2)}`}
                      </List.Header>
                      <List.Description>
                        {element.description}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                )}
              </List>
            </Card.Description>
          </Card.Content>
        </Card>
        }
      </Card.Group>
    </Segment>
  )
}

export default Travel
