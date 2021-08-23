import React from 'react'
import { Button, ButtonProps } from '@blueprintjs/core'

interface Props
  extends Omit<ButtonProps, 'disabled' | 'loading' | 'icon' | 'children'> {
  isFetchingNextPage: boolean
  hasNextPage: boolean | undefined
}

export default function FetchMoreButton({
  minimal = true,
  fill = true,
  isFetchingNextPage,
  hasNextPage,
  onClick,
  ...rest
}: Props) {
  return (
    <Button
      minimal={minimal}
      fill={fill}
      disabled={isFetchingNextPage || !hasNextPage}
      loading={isFetchingNextPage}
      icon={hasNextPage && 'arrow-down'}
      onClick={onClick}
      {...rest}
    >
      {hasNextPage ? 'Load More Todos' : 'No More Todos'}
    </Button>
  )
}
