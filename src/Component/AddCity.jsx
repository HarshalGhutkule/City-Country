import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Button from "@mui/material/Button";
import axios from "axios";
import { useReducer } from "react";

const Main = styled.div`
  height: 500px;
  padding: 5%;
  font-family: "Roboto", sans-serif;
`;

export const AddCity = () => {
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

  const [state, dispatch] = useReducer(reducer,initalState);

  let {cityName,population,country} = state;

  const addData = (e) => {
    e.preventDefault();
    axios.post("https://city--country.herokuapp.com/api/city", state).then(() => {
      alert("City added succesfully");
      dispatch({type:"cityName",payload:""})
      dispatch({type:"population",payload:""})
      dispatch({type:"country",payload:""})
    });
  };

  return (
    <Main>
      <h1>ADD CITY</h1>
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
        <Button variant="contained" onClick={addData}>
          ADD
        </Button>
      </form>
    </Main>
  );
};
