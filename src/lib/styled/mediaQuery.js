export function mediaMin(breakpoint, rules) {
    return (`
      @media (min-width: ${breakpoint}px) {
        ${rules}
      }
    `);
  }
  
  export function mediaMax(breakpoint, rules) {
    return (`
      @media (max-width: ${breakpoint}px) {
        ${rules}
      }
    `);
  }
  
  export function mediaMinMax(breakpointMin, breakpointMax, rules) {
    return (`
      @media (min-width: ${breakpointMin}px) and (max-width: ${breakpointMax}px) {
        ${rules}
      }
    `);
  }
  
  export const mediaQueries = {
    mediaMin,
    mediaMax,
    mediaMinMax,
  };
  