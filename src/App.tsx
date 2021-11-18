import { memo, useState, MouseEvent, useRef, useEffect } from 'react'
import styled from 'styled-components'

import { Point } from './components/Point'
import { Coordinates } from './types'
import { getPolygonArea, getPolygonCenter, getRadiusByArea } from './utils'
import { Controls } from './components/Controls'

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`
const Svg = styled.svg`
  position: relative;
  width: 100%;
  height: 100%;
`
const Circle = styled.circle`
  stroke: #ffdc32;
  stroke-width: 2px;
  fill: none;
  pointer-events: none;
`
const Parallelogram = styled.polygon`
  stroke: #74a4f0;
  stroke-width: 2px;
  fill: none;
  pointer-events: none;
`

export const App = memo(() => {
  const [firstPoint, setFirstPoint] = useState<Coordinates>()
  const [secondPoint, setSecondPoint] = useState<Coordinates>()
  const [thirdPoint, setThirdPoint] = useState<Coordinates>()
  const [forthPoint, setForthPoint] = useState<Coordinates>()
  const [offsetCanvas, setOffsetCanvas] = useState<Coordinates>({ x: 0, y: 0 })

  const containerRef = useRef<SVGSVGElement>(null)

  const points = [firstPoint!, secondPoint!, thirdPoint!, forthPoint!]
  const isAllPointsSet = firstPoint && secondPoint && thirdPoint && forthPoint

  const area = isAllPointsSet ? getPolygonArea(points) : 0
  const center = isAllPointsSet ? getPolygonCenter(points) : { cx: 0, cy: 0 }
  const radius = isAllPointsSet ? getRadiusByArea(area) : 0

  const onClick = (e: MouseEvent<SVGSVGElement>) => {
    if (!firstPoint) {
      return setFirstPoint({
        x: e.clientX - offsetCanvas.x,
        y: e.clientY - offsetCanvas.y,
      })
    }
    if (!secondPoint) {
      return setSecondPoint({
        x: e.clientX - offsetCanvas.x,
        y: e.clientY - offsetCanvas.y,
      })
    }
    if (!thirdPoint) {
      return setThirdPoint({
        x: e.clientX - offsetCanvas.x,
        y: e.clientY - offsetCanvas.y,
      })
    }
  }

  const reset = () => {
    setFirstPoint(undefined)
    setSecondPoint(undefined)
    setThirdPoint(undefined)
    setForthPoint(undefined)
  }

  useEffect(() => {
    setOffsetCanvas({
      x: containerRef.current?.getBoundingClientRect().x || 0,
      y: containerRef.current?.getBoundingClientRect().y || 0,
    })
  }, [containerRef])

  useEffect(() => {
    if (firstPoint && secondPoint && thirdPoint) {
      const fourthX = firstPoint.x - secondPoint.x + thirdPoint.x
      const fourthY = firstPoint.y - secondPoint.y + thirdPoint.y

      setForthPoint({ x: fourthX, y: fourthY })
    }
  }, [firstPoint, secondPoint, thirdPoint])

  return (
    <Container>
      <Controls reset={reset} />
      <Svg onClick={onClick} ref={containerRef}>
        {firstPoint && (
          <Point
            cx={firstPoint.x}
            cy={firstPoint.y}
            setPoint={setFirstPoint}
            offsetCanvas={offsetCanvas}
            containerRef={containerRef}
          />
        )}
        {secondPoint && (
          <Point
            cx={secondPoint.x}
            cy={secondPoint.y}
            setPoint={setSecondPoint}
            offsetCanvas={offsetCanvas}
            containerRef={containerRef}
          />
        )}
        {thirdPoint && (
          <Point
            cx={thirdPoint.x}
            cy={thirdPoint.y}
            setPoint={setThirdPoint}
            offsetCanvas={offsetCanvas}
            containerRef={containerRef}
          />
        )}

        {forthPoint && (
          <>
            <text x={center.cx} y={center.cy} textAnchor="middle">
              {area}
            </text>
            <Parallelogram
              points={`${firstPoint?.x},${firstPoint?.y} ${secondPoint?.x},${secondPoint?.y} ${thirdPoint?.x},${thirdPoint?.y} ${forthPoint?.x},${forthPoint?.y}`}
            />
            <Circle cx={center.cx} cy={center.cy} r={radius} />
          </>
        )}
      </Svg>
    </Container>
  )
})
