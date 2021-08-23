import React from 'react'
import styled, { keyframes } from 'styled-components'
import ListItem from './list-item'

const blink = keyframes`
  50% {
    opacity: 0.5;
  }
`

interface SkeletonProps {
  $width?: string
  $fill?: boolean
  $animationOffsetMs: number
}

const Skeleton = styled.div<SkeletonProps>`
  flex: ${props => (props.$fill ? 1 : 'initial')};
  width: ${props => props.$width || 'initial'};
  background-color: rgba(255, 255, 255, 0.15);
  opacity: 0.1;
  height: 24px;
  border-radius: 6px;
  animation: ${blink} 2000ms ease-in-out
    ${props => props.$animationOffsetMs || 0}ms infinite;
`

const Container = styled(ListItem)`
  display: flex;
  width: 100%;
  padding: 12px;
  div + div {
    margin-left: 12px;
  }
`

const Wrapper = styled.div`
  width: 100%;
`

const SkeletonItem = ({ offset = 0 }: { offset: number }) => (
  <Container>
    <Skeleton $animationOffsetMs={offset} $width="24px" />
    <Skeleton $fill $animationOffsetMs={offset} />
  </Container>
)

interface Props {
  rows?: number
}

export default function TodoItemSkeleton({ rows = 5 }: Props) {
  return (
    <Wrapper>
      {Array(rows)
        .fill(0)
        .map((_, index) => (
          <SkeletonItem offset={index * 100} key={index} />
        ))}
    </Wrapper>
  )
}
