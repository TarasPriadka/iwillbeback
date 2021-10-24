import {atom} from "recoil";

export function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export const goingOutAtom = atom({
    key: "goingOut",
    default: false
})

export const loggedInAtom = atom({
    key: "isUser",
    default: false
})

export const sessionIdAtom = atom({
    key: "sessionId",
    default: ""
})
export const socketAtom = atom({
    key: "socket",
    default: ""
})

export const prevLocationsAtom = atom({
    key: "prevLocationsAtom",
    default: [{
        lat: 37.88,
        lng: -122.2672373
    }, {
        lat: 37.9,
        lng: -122.2672373
    }
    ]
})