/* ATTENTION !!!
Les viewports ne sont pas seulements déclarés ici, voyez a modifier :
- app/assets/00_base/grid/_variables.scss
un changement des viewports doit être répliqué dans les scripts inline
- /DotCa/RC.DotCa.Web.App/bootstrap/server/app/inlineScripts/ads.js
*/
export const BREAKPOINTS = {
    XS: {
      min: 0,
      max: 640,
    },
    SM: {
      min: 641,
      max: 1023,
    },
    MD: {
      min: 1024,
      max: 1239,
    },
    LG: {
      min: 1240,
      max: 1365,
    },
    XL: {
      min: 1366,
      max: 2339,
    },
    XXL: {
      min: 2340,
      max: 99999,
    },
  };
  
  export const GUTTERS = {
    viewport: {
      XS: 10,
      SM: 20,
      MD: 20,
      LG: 20,
      XL: 20,
      XXL: 20,
    },
  };
  
  export const VIEWPORT_BREAKPOINT_NAMES = {
    viewport: {
      XS: 'xs',
      SM: 'sm',
      MD: 'md',
      LG: 'lg',
      XL: 'xl',
      XXL: 'xxl',
    },
  };
  