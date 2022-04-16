import { ADD_DATA } from "./ActionType"

export const addDataToRedux = (payload)=>({
    type:ADD_DATA,
    payload
});