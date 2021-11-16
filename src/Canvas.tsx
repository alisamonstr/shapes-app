import { memo, useState, MouseEvent, useRef, useEffect } from 'react'
import styled from 'styled-components'

import { Point } from './components/Point'
import { Coordinates } from './types'

const Container = styled.div`
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;
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

export const Canvas = memo(() => {
  const [firstPoint, setFirstPoint] = useState<Coordinates>()
  const [secondPoint, setSecondPoint] = useState<Coordinates>()
  const [thirdPoint, setThirdPoint] = useState<Coordinates>()
  const [forthPoint, setForthPoint] = useState<Coordinates>()
  const [offsetCanvas, setOffsetCanvas] = useState<Coordinates>({ x: 0, y: 0 })

  const containerRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    setOffsetCanvas({
      x: containerRef.current?.getBoundingClientRect().x || 0,
      y: containerRef.current?.getBoundingClientRect().y || 0,
    })
  }, [containerRef])

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

  const getCenter = () => {
    const points = [
      firstPoint,
      secondPoint,
      thirdPoint,
      forthPoint,
    ] as Coordinates[]
    const x = points.map((point) => point.x)
    const y = points.map((point) => point.y)
    const cx = (Math.min(...x) + Math.max(...x)) / 2
    const cy = (Math.min(...y) + Math.max(...y)) / 2
    return { cx, cy }
  }

  const getArea = () => {
    const points = [
      firstPoint,
      secondPoint,
      thirdPoint,
      forthPoint,
    ] as Coordinates[]
    const area = points.reduce((total, point, index) => {
      const nextIndex = index == points.length - 1 ? 0 : index + 1
      const addX = point.x
      const addY = points[nextIndex].y
      const subX = points[nextIndex].x
      const subY = point.y

      total += addX * addY * 0.5
      total -= subX * subY * 0.5
      return total
    }, 0)

    return Math.abs(area)
  }

  const getCircleRadius = () => {
    const area = getArea()
    return Math.sqrt(area / Math.PI)
  }

  useEffect(() => {
    if (firstPoint && secondPoint && thirdPoint) {
      const fourthX = firstPoint.x - secondPoint.x + thirdPoint.x
      const fourthY = firstPoint.y - secondPoint.y + thirdPoint.y

      setForthPoint({ x: fourthX, y: fourthY })
    }
  }, [firstPoint, secondPoint, thirdPoint])

  return (
    <Container>
      <Svg onClick={onClick} ref={containerRef}>
        {firstPoint && (
          <Point
            cx={firstPoint.x}
            cy={firstPoint.y}
            setPoint={setFirstPoint}
            offsetCanvas={offsetCanvas}
          />
        )}
        {secondPoint && (
          <Point
            cx={secondPoint.x}
            cy={secondPoint.y}
            setPoint={setSecondPoint}
            offsetCanvas={offsetCanvas}
          />
        )}
        {thirdPoint && (
          <Point
            cx={thirdPoint.x}
            cy={thirdPoint.y}
            setPoint={setThirdPoint}
            offsetCanvas={offsetCanvas}
          />
        )}
        {forthPoint && (
          <Parallelogram
            points={`${firstPoint?.x},${firstPoint?.y} ${secondPoint?.x},${secondPoint?.y} ${thirdPoint?.x},${thirdPoint?.y} ${forthPoint?.x},${forthPoint?.y}`}
          />
        )}

        {forthPoint && (
          <Circle
            cx={getCenter().cx}
            cy={getCenter().cy}
            r={getCircleRadius()}
          />
        )}
      </Svg>
    </Container>
  )
})
