import React, { useState } from 'react'
import { Card, Divider, Form, Icon, Input, List, Message } from 'semantic-ui-react'

import { calculateCo2, calculateMJ, findColor, ICONS } from '../Utilities'
import { EQUIVALENTS, TABLE_1, TABLE_2 } from '../Emissions'

function Basic () {
  const [distance, setDistance] = useState(0)

  return (
    <>
      <Message info content='Tallene kalkuleres med en gang du angir avstand' icon='info' size='big' />
      <Form size='huge'>
        <Form.Group widths='equal'>
          <Form.Field>
            <Input label={{ color: 'teal', content: 'Avstand (i km):' }} placeholder='Avstand (i km)' fluid
                   value={distance} type='number'
                   onChange={(event) => setDistance(event.target.value < 0 ? 0 : event.target.value)}
            />
          </Form.Field>
          <Form.Field />
          <Form.Field />
        </Form.Group>
      </Form>
      <Divider hidden />
      <Card.Group centered stackable itemsPerRow={4}>
        {Object.entries(TABLE_2.data).map(([key, value]) => {
            const co2 = calculateCo2(value[3], distance)
            const mj = TABLE_1.data.hasOwnProperty(key) ? calculateMJ(TABLE_1.data[key][3], distance) : 0
            const color = findColor(co2)

            return (
              <Card key={key} color={color}>
                <Card.Content>
                  <Icon name={ICONS[key]} size='huge' style={{ float: 'right' }} />
                  <Card.Header>
                    {key.includes('aa') ? key.replace('aa', 'å') : key === 'Bil' ? `${key} (bensin/diesel)` : key}
                  </Card.Header>
                  <Card.Meta>{`Utslipp: `}<b>{`${co2} kg/CO`}<sub>2</sub>e</b></Card.Meta>
                  <Card.Meta>{`Energiforbruk: `}<b>{`${mj} MJ`}</b></Card.Meta>
                  <Card.Description>
                    <Divider hidden />
                    <List>
                      {EQUIVALENTS.map(element =>
                        <List.Item key={element.text}>
                          {element.text === 'egg' ?
                            <List.Icon flipped='vertically' name={element.icon} color={element.color} />
                            :
                            <List.Icon name={element.icon} color={element.color} />}
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
          }
        )}
      </Card.Group>
    </>
  )
}

export default Basic
