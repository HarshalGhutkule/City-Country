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

export const AddCountry = () => {

  const initialState = {
    country: "",
  };

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "country":
        return { ...state, country: payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  let { country } = state;


  const handleChange = (e) => {
    dispatch({ type: "country", payload: e.target.value });
  };

  const addData = (e) => {
    e.preventDefault();
    axios.post("https://city--country.herokuapp.com/country", state).then(() => {
      alert("Country added succesfully");
      dispatch({ type: "country", payload: "" });
    });
  };

  return (
    <Main>
      <h1>ADD COUNTRY</h1>
      <form>
        <label htmlFor="">Country Name</label>
        <br />
        <br />
        <TextField
          id="outlined-basic"
          type={"text"}
          value={country}
          label="Country Name"
          variant="outlined"
          onChange={(e) => handleChange(e)}
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
