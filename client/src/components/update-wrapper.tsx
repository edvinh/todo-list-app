import React from 'react'
import styled from 'styled-components'

interface UpdateWrapperContainerProps {
  updating: boolean
  disableDuringUpdate?: boolean
}

type Props = React.PropsWithChildren<UpdateWrapperContainerProps>

const UpdateWrapperContainer = styled.div<UpdateWrapperContainerProps>`
  transition: opacity 100ms linear;
  opacity: ${props => (props.updating ? 0.5 : 1)};
  pointer-events: ${props =>
    props.disableDuringUpdate && props.updating ? 'none' : 'initial'};
`

export default function UpdateWrapper({
  updating,
  disableDuringUpdate,
  children,
  ...rest
}: Props) {
  return (
    <UpdateWrapperContainer
      updating={updating}
      disableDuringUpdate={disableDuringUpdate}
      {...rest}
    >
      {children}
    </UpdateWrapperContainer>
  )
}
