import {atom} from "recoil";

export function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export const goingOutAtom = atom({
    key: "goingOut",
    default: false
})