import React, { useState } from 'react'
import { Card, Divider, Form, Icon, Input, Segment } from 'semantic-ui-react'

import { EQUIVALENTS, TABLE_1, TABLE_2 } from './Emissions'
import { METADATA } from './Utilities'

const calculateCo2 = (value, distance, people) => +(((value * distance) / 1000) / people).toFixed(2)
const calculateMJ = (value, distance, people) => +(value * distance * people).toFixed(0)
const findColor = (value) => value < 50 ? 'green' : value < 200 ? 'olive' : value < 500 ? 'yellow' : value < 2000 ? 'orange' : 'red'

function App () {
  const [distance, setDistance] = useState(0)
  const [people, setPeople] = useState(1)

  return (
    <Segment basic>
      <Form size='huge'>
        <Form.Group widths='equal'>
          <Form.Field>
            <Input label={{ color: 'teal', content: 'Avstand (i km):' }} placeholder='Avstand (i km)' name='distance'
                   value={distance} onChange={(event) => setDistance(event.target.value < 0 ? 0 : event.target.value)}
                   fluid type='number' />
          </Form.Field>
          <Form.Field>
            <Input label={{ color: 'teal', content: 'Antall personer:' }} placeholder='Antall personer' name='people'
                   value={people} onChange={(event) => setPeople(event.target.value < 1 ? 1 : event.target.value)} fluid
                   type='number' />
          </Form.Field>
        </Form.Group>
      </Form>
      <Divider hidden />
      <Card.Group centered stackable itemsPerRow={4}>
        {Object.entries(TABLE_2.data).map(([key, value]) => {
            const co2 = calculateCo2(value[3], distance, people)
            const mj = TABLE_1.data.hasOwnProperty(key) ? calculateMJ(TABLE_1.data[key][3], distance, people) : 0
            const color = findColor(co2)

            return (
              <Card key={key} color={color}>
                <Card.Content>
                  <Icon name={METADATA[key].icon} size='big' style={{ float: 'right' }} />
                  <Card.Header>
                    {key.includes('aa') ? key.replace('aa', 'å') : key}
                  </Card.Header>
                  <Card.Meta>{`Utslipp: `}<b>{`${co2} kg/CO`}<sub>2</sub></b></Card.Meta>
                  <Card.Meta>{`Energiforbruk: `}<b>{`${mj} MJ`}</b></Card.Meta>
                  <Card.Description>
                    <Divider hidden />
                    {EQUIVALENTS.map(element =>
                      <p key={element.text}>
                        {`Antall ${element.text}: ${+element.calculate((co2 / element.value)).toFixed(2)}`}
                      </p>
                    )}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  {METADATA[key].description}
                </Card.Content>
              </Card>
            )
          }
        )}
      </Card.Group>
    </Segment>
  )
}

export default App
