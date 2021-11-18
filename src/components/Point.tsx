import { memo, useCallback, useState, useEffect, RefObject } from 'react'
import styled from 'styled-components'

import { Coordinates } from '../types'

const Circle = styled.circle<{ isDraggable: boolean }>`
  cursor: ${(p) => (p.isDraggable ? 'grabbing' : 'grab')};
  fill: #d8441e;
`

const SIZE = 11

interface PointProps {
  cx: number
  cy: number
  setPoint: (coordinates: Coordinates) => void
  offsetCanvas: Coordinates
  containerRef: RefObject<SVGSVGElement>
}

export const Point = memo(
  ({ cx, cy, setPoint, offsetCanvas, containerRef }: PointProps) => {
    const [isDraggable, setIsDraggable] = useState(false)

    const onDragStart = useCallback(
      () => setIsDraggable(true),
      [setIsDraggable],
    )
    const onDragEnd = useCallback(() => setIsDraggable(false), [setIsDraggable])

    const onDrag = useCallback(
      (event: MouseEvent | TouchEvent) => {
        if (isDraggable) {
          const x =
            event.type === 'touchmove'
              ? (event as TouchEvent).touches[0].clientX
              : (event as MouseEvent).clientX
          const y =
            event.type === 'touchmove'
              ? (event as TouchEvent).touches[0].clientY
              : (event as MouseEvent).clientY
          setPoint({
            x: x - offsetCanvas.x,
            y: y - offsetCanvas.y,
          })
        }
      },
      [isDraggable, offsetCanvas, setPoint],
    )

    useEffect(() => {
      if (isDraggable && containerRef.current) {
        const container = containerRef.current
        container.addEventListener('mousemove', onDrag)
        container.addEventListener('touchmove', onDrag)

        return () => {
          container?.removeEventListener('mousemove', onDrag)
          container?.removeEventListener('touchmove', onDrag)
        }
      }
    }, [isDraggable, onDrag, containerRef])

    return (
      <>
        <text x={cx + SIZE} y={cy - SIZE}>
          ({cx}, {cy})
        </text>
        <Circle
          cx={cx}
          cy={cy}
          r={SIZE / 2}
          onMouseDown={onDragStart}
          onMouseUp={onDragEnd}
          onTouchStart={onDragStart}
          onTouchEnd={onDragEnd}
          isDraggable={isDraggable}
        />
      </>
    )
  },
)
