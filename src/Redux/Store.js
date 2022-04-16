import { reducer } from "./Reducer";
import { createStore } from "redux";

export const store = new createStore(reducer,{city:[]});