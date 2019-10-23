export const TABLE_1 = {
  name: 'Tabell S1',
  description: 'Energiforbruk per personkilometer 1994-2050 i tre scenarioer',
  data: {
    Persontog: [0.70, 0.63, 0.62, 0.50, 0.49, 0.49, 0.50, 0.45, 0.42, 0.49, 0.42, 0.34],
    Mopeder: [0.82, 0.82, 0.82, 0.61, 0.57, 0.49, 0.46, 0.37, 0.29, 0.43, 0.29, 0.20],
    Motorsykler: [1.29, 1.29, 1.29, 0.97, 0.90, 0.77, 0.73, 0.59, 0.46, 0.68, 0.45, 0.31],
    Rutebusser: [0.98, 0.85, 1.06, 0.87, 0.82, 0.77, 0.87, 0.78, 0.74, 0.83, 0.78, 0.70],
    Personbil: [1.49, 1.46, 1.37, 1.05, 0.98, 0.84, 0.79, 0.64, 0.50, 0.73, 0.49, 0.34],
    Drosjer: [2.98, 2.65, 2.32, 1.74, 1.62, 1.39, 1.30, 1.05, 0.83, 1.22, 0.81, 0.56],
    Fly: [2.69, 2.78, 2.61, 1.52, 1.36, 1.21, 1.35, 1.14, 0.94, 1.24, 0.95, 0.70],
    Hurtigruta: [6.53, 5.72, 5.02, 5.02, 4.76, 4.51, 4.76, 4.29, 3.61, 4.76, 4.05, 3.61],
    Ferger: [9.13, 8.02, 8.48, 8.48, 8.06, 7.63, 8.06, 7.25, 6.11, 8.06, 6.85, 5.73],
    Hurtigbaat: [10.66, 10.46, 12.35, 12.35, 11.73, 11.11, 11.73, 10.56, 8.89, 11.73, 9.97, 8.89]
  }
}

export const TABLE_2 = {
  name: 'Tabell S2"',
  description: 'CO2-utslipp per personkilometer 1994-2050 i tre scenarioer',
  data: {
    Personbil: [108, 105, 100, 77, 72, 61, 54, 29, 12, 54, 21, 3],
    Persontog: [14, 10, 8, 7, 7, 6, 7, 6, 3, 7, 3, 0],
    Rutebusser: [72, 63, 78, 64, 61, 57, 64, 58, 54, 58, 51, 46],
    Drosjer: [210, 195, 172, 129, 120, 103, 90, 48, 21, 90, 36, 5],
    Fly: [196, 203, 191, 111, 100, 89, 98, 84, 69, 91, 70, 51],
    Ferger: [669, 588, 621, 621, 584, 547, 590, 467, 383, 559, 467, 410],
    Mopeder: [59, 59, 59, 44, 41, 35, 31, 17, 7, 31, 12, 2],
    Motorsykler: [68, 66, 63, 47, 44, 38, 33, 18, 8, 33, 13, 2],
    Hurtigruta: [479, 419, 367, 367, 345, 323, 349, 276, 226, 331, 276, 242],
    Hurtigbaat: [781, 767, 904, 904, 850, 796, 859, 680, 557, 814, 680, 597]
  }
}

export const TABLE_3 = {
  name: 'Tabell S3"',
  description: 'Energiforbruk per tonnkilometer 1994-2050 i tre scenarioer',
  data: {
    Lastebil: [2.04, 1.60, 1.84, 1.41, 1.17, 0.95, 1.30, 1.00, 0.80, 1.23, 0.94, 0.72],
    Skip: [1.04, 0.80, null, 0.80, 0.76, 0.72, 0.76, 0.68, 0.57, 0.76, 0.64, 0.57],
    Fly: [31.10, 32.10, 30.20, 17.50, 15.80, 14.00, 15.50, 13.20, 10.90, 14.30, 11.00, 8.00],
    Jernbane: [0.34, 0.32, 0.26, 0.18, 0.12, 0.09, 0.26, 0.20, 0.15, 0.18, 0.12, 0.09],
    Ferger: [9.13, 8.02, 8.48, 8.48, 8.06, 7.63, 8.06, 7.25, 6.11, 8.06, 6.85, 6.11],
    Hurtigruta: [6.53, 5.72, 5.02, 5.02, 4.77, 4.52, 4.77, 4.29, 3.61, 4.77, 4.05, 3.61]
  }
}

export const TABLE_4 = {
  name: 'Tabell S4"',
  description: 'CO2-utslipp per tonnkilometer 1994-2050 i tre scenarioer',
  data: {
    Lastebil: [150, 117, 135, 97, 74, 54, 85, 54, 35, 78, 47, 27],
    Skip: [87, 74, 57, 57, 53, 50, 54, 43, 35, 51, 43, 37],
    Fly: [2270, 2350, 2210, 1280, 1150, 1020, 1130, 960, 790, 1050, 800, 580],
    Jernbane: [null, 13, 12, 8, 7, 6, 7, 4, 3, 5, 1, 0],
    Ferger: [669, 588, 621, 621, 584, 546, 590, 467, 383, 559, 467, 410],
    Hurtigruta: [479, 419, 367, 367, 345, 323, 349, 276, 226, 330, 276, 242]
  }
}

export const EQUIVALENTS = [
  { text: 'biff', value: 13.3 },
  { text: 'egg', value: 1.95 }
]