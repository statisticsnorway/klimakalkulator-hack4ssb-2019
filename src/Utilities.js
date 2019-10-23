export const METADATA = {
  Sykkel: {
    icon: 'bicycle'
  },
  Elbil: {
    icon: 'power cord'
  },
  Personbil: {
    icon: 'car'
  },
  Persontog: {
    icon: 'train'
  },
  Rutebusser: {
    icon: 'bus'
  },
  Drosjer: {
    icon: 'taxi'
  },
  Fly: {
    icon: 'plane'
  },
  Ferger: {
    icon: 'ship'
  },
  Mopeder: {
    icon: 'motorcycle'
  },
  Motorsykler: {
    icon: 'motorcycle'
  },
  Hurtigruta: {
    icon: 'ship'
  },
  Hurtigbaat: {
    icon: 'ship'
  },
  Lastebil: {
    icon: 'truck'
  },
  Skip: {
    icon: 'ship'
  },
  Jernbane: {
    icon: 'train'
  }
}

const earthRadiusKm = 6371

const degreesToRadians = (degrees) => {
  return degrees * Math.PI / 180
}

export const distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
  const dLat = degreesToRadians(lat2 - lat1)
  const dLon = degreesToRadians(lon2 - lon1)

  lat1 = degreesToRadians(lat1)
  lat2 = degreesToRadians(lat2)

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return earthRadiusKm * c
}
