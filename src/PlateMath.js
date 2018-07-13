// @flow

export const DEFAULT_BARBELL_WEIGHT = 45
export const DEFAULT_PLATES = [45, 35, 25, 10, 5, 2.5]

class PlateMath {
  barbellWeight: number
  listOfAvailablePlates: number[]

  constructor (
    barbellWeight: number = DEFAULT_BARBELL_WEIGHT,
    listOfAvailablePlates: number[] = DEFAULT_PLATES
  ) {
    this.barbellWeight = barbellWeight
    this.listOfAvailablePlates = listOfAvailablePlates.sort((a, b) => b - a)
  }

  get minimumPlateWeight () : number {
    return this.listOfAvailablePlates[this.listOfAvailablePlates.length - 1]
  }

  get middlePlateWeight () : number {
    return this.listOfAvailablePlates[Math.floor(this.listOfAvailablePlates.length / 2)]
  }

  get maximumPlateWeight () : number {
    return this.listOfAvailablePlates[0]
  }

  calculate (weight: number) {
    let results = [];

    if (weight < this.barbellWeight || weight % this.minimumPlateWeight !== 0) {
      return results;
    }

    weight -= this.barbellWeight;
    weight /= 2;
    while (weight > 0) {
      for (let plate of this.listOfAvailablePlates) {
        if (weight >= plate) {
          weight -= plate;
          results.push(plate);
          break;
        }
      }
    }

    return results;
  }
}

export default PlateMath
