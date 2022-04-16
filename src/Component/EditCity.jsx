import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Main = styled.div`
  height: 500px;
  padding: 5%;
  font-family: "Roboto", sans-serif;
`;

export const EditCity = () => {

    const initalState = {
        cityName: "",
        population: "",
        country: "",
    };

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "cityName":
        return { ...state, cityName: payload };
      case "population":
        return { ...state, population: payload };
      case "country":
        return { ...state, country: payload };
      default:
        return state;
    }
  };

    let reduxData = useSelector((store)=>store.city);

    const {id} = useParams();

    let [actualData] = reduxData.filter((a)=>a.id == id);

    let {cityName,population,country} = actualData;

  const [state, dispatch] = useReducer(reducer,initalState);

  useEffect(()=>{
    dispatch({type:"cityName",payload:cityName})
    dispatch({type:"population",payload:population})
    dispatch({type:"country",payload:country})
},[])

  const updateData = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/city/${id}`, state).then(() => {
      alert("Updated succesfully");
      dispatch({type:"cityName",payload:""})
      dispatch({type:"population",payload:""})
      dispatch({type:"country",payload:""})
    });
  };

  return (
    <Main>
      <h1>EDIT CITY</h1>
      <form>
        <label htmlFor="">City Name</label>
        <br />
        <br />
        <TextField
          id="outlined-basic"
          type={"text"}
          value={cityName}
          label="City Name"
          variant="outlined"
          onChange={(e)=>dispatch({type:"cityName",payload:e.target.value})}
        />
        <br />
        <br />
        <label htmlFor="">Population</label>
        <br />
        <br />
        <TextField
          id="outlined-basic"
          type={"number"}
          value={population}
          label="Population"
          variant="outlined"
          onChange={(e)=>dispatch({type:"population",payload:e.target.value})}
        />
        <br />
        <br />
        <label htmlFor="">Country</label>
        <br />
        <br />
        <TextField
          id="outlined-basic"
          type={"text"}
          value={country}
          label="Country"
          variant="outlined"
          onChange={(e)=>dispatch({type:"country",payload:e.target.value})}
        />
        <br />
        <br />
        <Button variant="contained" onClick={updateData}>
          CHANGE
        </Button>
      </form>
    </Main>
  );
};
