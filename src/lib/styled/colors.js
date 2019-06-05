export const colorsDx = {
    black: '#000000',
    blue: '#006699',
    blueLight: '#edf4f8',
    denim: '#0b2c3f',
    graphite: '#222222',
    grey: '#f4f4f4',
    marine: '#003c55',
    red: '#d00',
    white: '#ffffff',
  };
  
  export const colorsDxRgb = {
    black: '0, 0, 0',
    blue: '0, 102, 153',
    blueLight: '237, 244, 248',
    denim: '11, 44, 63',
    graphite: '34, 34, 34',
    grey: '244, 244, 244',
    marine: '00, 60, 85',
    red: '221, 0, 0',
    white: '255, 255, 255',
  };
  
  export const colorsUi = {
    blue: '#007ea2',
    darkgrey: '#b4b4b4',
    green: '#1e8552',
    lightgrey: '#d4d4d4',
    live: '#ffd501',
    orange: '#f99c00',
    pastelgrey: '#ccc',
    red: '#e00000',
    yellow: '#f7f700',
    // Blacks
    black08: `rgba(${colorsDxRgb.black}, .08)`,
    black10: `rgba(${colorsDxRgb.black}, .1)`,
    black20: `rgba(${colorsDxRgb.black}, .2)`,
    black40: `rgba(${colorsDxRgb.black}, .4)`,
    black60: `rgba(${colorsDxRgb.black}, .6)`,
    black70: `rgba(${colorsDxRgb.black}, .7)`,
    black80: `rgba(${colorsDxRgb.black}, .8)`,
    // Whites
    white08: `rgba(${colorsDxRgb.white}, .08)`,
    white16: `rgba(${colorsDxRgb.white}, .16)`,
    white80: `rgba(${colorsDxRgb.white}, .8);`,
    /* Dégradé */
    gradient04: `linear-gradient(to bottom, rgba(${colorsDxRgb.black}, 0) 0%, rgba(${colorsDxRgb.black}, .04) 100%);`,
    gradient04top: `linear-gradient(to top, rgba(${colorsDxRgb.black}, 0) 0%, rgba(${colorsDxRgb.black}, .04) 100%);`,
    gradient08: `linear-gradient(to bottom, rgba(${colorsDxRgb.black}, 0) 0%, rgba(${colorsDxRgb.black}, .08) 100%);`,
  };
  
  export const colorsTxt = {
    DXB4: '#b4b4b4',
    DX2: '#222',
    DX4: '#444',
    DX6: '#666',
  };
  
  export const colorsBrands = {
    arts: '#de2960',
    artv: '#84329b',
    explora: '#009cde',
    info: '#d00',
    jeunesse: '#1bb600',
    musique: '#4b5fde',
    premiere: '#fa6610',
    premierePlus: '#732258',
    rdi: '#d00',
    rad: '#353034',
    rci: '#c00000',
    rciBlue: '#004990',
    sport: '#003c56',
    tele: '#c6007e',
    toutv: '#00a5ad',
    toutvExtra: '#b6dee5',
  };
  
  export const colorsPalette = {
    colorsBrands,
    colorsDx,
    colorsDxRgb,
    colorsTxt,
    colorsUi,
  };
  