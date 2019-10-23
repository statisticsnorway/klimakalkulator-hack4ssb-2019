import React, { useState } from 'react'
import { Card, Divider, Form, Icon, Segment } from 'semantic-ui-react'

import { EQUIVALENTS, TABLE_2 } from './Emissions'
import { ICONS } from './Utilities'

function App () {
  const [distance, setDistance] = useState(0)
  const [people, setPeople] = useState(1)

  return (
    <Segment basic>
      <Form size='huge'>
        <Form.Input label='Personer' placeholder='Personer' name='people'
                    value={people} onChange={(event) => setPeople(event.target.value)} />
        <Form.Input label='Avstand (i km)' placeholder='Avstand (i km)' name='distance'
                    value={distance} onChange={(event) => setDistance(event.target.value)} />
      </Form>
      <Divider hidden />
      <Card.Group centered stackable>
        {Object.entries(TABLE_2.data).map(([key, value]) => {
            const co2 = +(((value[3] * distance) / 1000) / people).toFixed(2)
            const color = co2 < 100 ? 'green' : co2 < 200 ? 'olive' : co2 < 500 ? 'yellow' : co2 < 1000 ? 'orange' : 'red'

            return (
              <Card key={key} color={color}>
                <Card.Content>
                  <Icon name={ICONS[key]} size='big' style={{float: 'right'}} />
                  <Card.Header>{key.includes('aa') ? key.replace('aa', 'å') : key}</Card.Header>
                  <Card.Meta>{`${co2} kg/CO`}<sub>2</sub></Card.Meta>
                  <Card.Description>
                    {EQUIVALENTS.map(element =>
                      <p key={element.text}>
                        {`Antall kilo ${element.text}: ${+(co2 / element.value).toFixed(2)}`}
                      </p>
                    )}
                  </Card.Description>
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
