import { atom, query, selector } from 'recoil';
import axios from 'axios';

export const tracDetailsCar = atom({
    key: "tracDetailsCar",
    default: []
})
export const tracDetailsVolt = atom({
    key: "tracDetailsVolt",
    default: []
})
export const driverStats = atom({
    key: "drivers",
    default: []
})
export const coachStats = atom({
    key: "coach",
    default: []
})
export const horses = atom({
    key: "horses",
    default: []
})
export const raceCity = atom({
    key:"raceCity",
    default: ''
})
export const startNums = atom({
    key: "starsNu",
    default: []
})
export const horseOds = atom({
    key: "horseOds",
    default: []
})
export const historyOds = atom({
    key: "historyOds",
    default: []
})

export const selectStart = atom({
    key: "selectStart",
    default: 1
})
export const detailsForResults = atom({
    key: "detailsForResults",
    default: []
})
export const todayOds = selector({
    key: "todayOds",
    get: ({ get }) => {
        const ods = get(horseOds)
        const strat = get(selectStart)
        const startOds = ods.filter(x => x['start_num'] == strat)


        return startOds
    }
})

export const selectDetailsRes = selector({
    key: "selectDetailsRes",
    get: ({ get }) => {
        const resultsdata = get(detailsForResults)
        const startNum = get(selectStart)
        const filteredRes = resultsdata.filter(x => x['raceNumber'] == startNum)

        return filteredRes[0]

    }
})






