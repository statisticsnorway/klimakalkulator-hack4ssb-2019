import React from 'react'
import { Divider, Header, Icon, Segment, Tab } from 'semantic-ui-react'

import Basic from './tabs/Basic'
import Travel from './tabs/Travel'

function App () {
  const panes = [
    { menuItem: 'Utslipp', render: () => <Tab.Pane><Basic /></Tab.Pane> },
    { menuItem: 'Reise', render: () => <Tab.Pane><Travel /></Tab.Pane> }
  ]

  return (
    <Segment basic>
      <Header as='h1'>
        <Icon.Group size='huge'>
          <Icon name='globe' style={{ color: '#143f90' }} />
          <Icon corner name='leaf' style={{ color: '#1a9d49' }} />
        </Icon.Group>
        <Header.Content style={{ marginTop: '1em' }}>
          Klimakalkulator for reise
          <Header.Subheader>
            Green Dream Team #hack4ssb 2019
          </Header.Subheader>
        </Header.Content>
      </Header>
      <Divider hidden />
      <Tab panes={panes} />
    </Segment>
  )
}

export default App
