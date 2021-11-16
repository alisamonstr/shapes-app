import { memo } from 'react'
import styled from 'styled-components'

import { Coordinates } from '../types'

const Wrapper = styled.foreignObject`
  background: #d8441e;
  border-radius: 50%;
  cursor: default;
  &:active {
    cursor: default;
  }
`
const Circle = styled.div`
  height: 11px;
  width: 11px;
  cursor: default;
  &:active {
    cursor: default;
  }
`
const SIZE = 11

interface PointProps {
  cx: number
  cy: number
  setPoint: (coordinates: Coordinates) => void
  offsetCanvas: Coordinates
}

export const Point = memo(({ cx, cy, setPoint, offsetCanvas }: PointProps) => (
  <Wrapper x={cx - SIZE / 2} y={cy - SIZE / 2} width={SIZE} height={SIZE}>
    <Circle
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move'
      }}
      onDrag={(e) => {
        setPoint({
          x: e.clientX - offsetCanvas.x,
          y: e.clientY - offsetCanvas.y,
        })
      }}
      onDragOver={(e) => e.preventDefault()}
    />
  </Wrapper>
))
