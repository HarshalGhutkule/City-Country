import { ADD_DATA } from "./ActionType";

export const reducer = (store,{type,payload})=>{

    switch(type){
        case ADD_DATA:
            return {...store,city:payload};
        default:
            return store;
    }
}