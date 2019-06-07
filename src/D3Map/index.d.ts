import React from 'react';

export type D3MapProps = {
    allowInteractivity?: boolean, // this is currently splitted
    allParties?: any[],
    allRidings?: any[],
    currentRidingId?: number,
    electionId: string,
    e6nHardcodedRidingIdFix?: number,
    E6N_PAGE_IDS?: any,
    E6NToolTip?: any,
    forwardMapRef?: any,
    isWidget?: boolean,
    isRidingOpen?: boolean,
    mapData: any,
    mapDOMContextId: string,
    mapId: string,
    setCurrentRiding?: VoidFunction,
    setCurrentRidingTooltip?: VoidFunction,
    styling?: any,
    ZoomOutButton?: any,
}

declare const D3Map: React.ComponentType<D3MapProps>;

export default D3Map;