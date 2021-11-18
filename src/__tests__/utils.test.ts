import { getPolygonCenter, getPolygonArea, getRadiusByArea } from '../utils'

describe('getPolygonCenter', () => {
  it('should return the center of a polygon', () => {
    const polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ]
    const center = getPolygonCenter(polygon)
    expect(center).toEqual({ cx: 0.5, cy: 0.5 })
  })
})

describe('getPolygonArea', () => {
  it('should return the area of a polygon', () => {
    const polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ]
    const area = getPolygonArea(polygon)
    expect(area).toEqual(1)
  })
})

describe('getRadiusByArea', () => {
  it('should return the radius of a circle by area', () => {
    const radius = getRadiusByArea(30)
    expect(radius).toBeCloseTo(3.09, 2)
  })
})
