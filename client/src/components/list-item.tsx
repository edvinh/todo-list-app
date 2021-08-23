import { Card } from '@blueprintjs/core'
import styled from 'styled-components'

const ListItem = styled(Card)`
  transition: all 100ms ease-out;
  padding: 8px;
  border-radius: 0;

  && {
    border-bottom: 1px solid rgb(16 22 26 / 40%);
    box-shadow: none;
  }
`

export default ListItem
