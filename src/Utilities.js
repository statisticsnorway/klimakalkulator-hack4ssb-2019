export const ICONS = {
  Sykkel: 'bicycle',
  Elbil: 'power cord',
  Bil: 'car',
  Tog: 'train',
  Buss: 'bus',
  Drosje: 'taxi',
  Fly: 'plane',
  Ferge: 'ship',
  Moped: 'motorcycle',
  Motorsykkel: 'motorcycle',
  Hurtigruta: 'ship',
  Hurtigbaat: 'ship'
}

export const TRANSPORT_TYPES = Object.entries(ICONS).map(([key, value]) => ({
  key: key,
  value: key,
  text: key,
  icon: value
}))

export const calculateCo2 = (value, distance, people) => +(((value * distance) / 1000) / people).toFixed(2)
export const calculateMJ = (value, distance, people) => +(value * distance * people).toFixed(0)
export const findColor = (value) => value < 50 ? 'green' : value < 200 ? 'olive' : value < 500 ? 'yellow' : value < 2000 ? 'orange' : 'red'
export const calculateSmiley = (value) => value < 50 ? 'smile' : value < 200 ? 'meh' : value < 500 ? 'meh' : value < 2000 ? 'meh' : 'frown'

const degreesToRadians = (degrees) => {
  return degrees * Math.PI / 180
}

export const distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
  const dLat = degreesToRadians(lat2 - lat1)
  const dLon = degreesToRadians(lon2 - lon1)
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2))
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return 6371 * c
}
