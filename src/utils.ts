import { Coordinates } from './types'

export const getPolygonCenter = (points: Coordinates[]) => {
  const x = points.map((point) => point.x)
  const y = points.map((point) => point.y)
  const cx = (Math.min(...x) + Math.max(...x)) / 2
  const cy = (Math.min(...y) + Math.max(...y)) / 2

  return { cx, cy }
}

export const getPolygonArea = (points: Coordinates[]) => {
  const area = points.reduce((total, point, index) => {
    const nextIndex = index === points.length - 1 ? 0 : index + 1
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

export const getRadiusByArea = (area: number) => Math.sqrt(area / Math.PI)
