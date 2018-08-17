import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import './Loading.css'

const Loading = () => (
  <Segment className='loading'>
    <Dimmer active>
      <Loader size='big'/>
    </Dimmer>

    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
  </Segment>
)

export default Loading
