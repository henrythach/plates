// @flow

import PlateMath, { DEFAULT_BARBELL_WEIGHT, DEFAULT_PLATES } from './PlateMath'

describe('defaults', () => {
  let plateMath
  beforeEach(() => {
    plateMath = new PlateMath()
  })

  it ('barbell weight', () => {
    expect(plateMath.barbellWeight).toEqual(DEFAULT_BARBELL_WEIGHT)
  })

  it ('list of available plates', () => {
    expect(plateMath.listOfAvailablePlates).toEqual(DEFAULT_PLATES)
  })
})

describe ('calculate', () => {
  const plateMath = new PlateMath(45, [45, 35, 25, 10, 5, 2.5])
  it ('return empty if <= barbell weight', () => {
    expect(plateMath.calculate(-10)).toEqual([])
    expect(plateMath.calculate(0)).toEqual([])
    expect(plateMath.calculate(5)).toEqual([])
    expect(plateMath.calculate(35)).toEqual([])
    expect(plateMath.calculate(45)).toEqual([])
  })

  it ('returns empty if not divisible by anything', () => {
    expect(plateMath.calculate(4)).toEqual([])
    expect(plateMath.calculate(11)).toEqual([])
    expect(plateMath.calculate(13)).toEqual([])
    expect(plateMath.calculate(27)).toEqual([])
    expect(plateMath.calculate(44)).toEqual([])
  })
})

it ('sorts list of available plates (descending)', () => {
  const plateMath = new PlateMath(45, [5, 25, 10, 2.5, 35, 45])
  expect(plateMath.listOfAvailablePlates).toEqual([45, 35, 25, 10, 5, 2.5])
})

it ('gets minimal plate', () => {
  const plateMath = new PlateMath(45, [2.5, 5, 45, 1, 0.5, 35, 10])
  expect(plateMath.minimumPlateWeight).toEqual(0.5)
})

it ('gets maximum plate', () => {
  const plateMath = new PlateMath(45, [2.5, 5, 45, 1, 0.5, 35, 10])
  expect(plateMath.maximumPlateWeight).toEqual(45)
})

it ('gets middle (median) plate', () => {
  const plateMath = new PlateMath(45, [2.5, 5, 45, 35, 10])
  expect(plateMath.middlePlateWeight).toEqual(10)
})
