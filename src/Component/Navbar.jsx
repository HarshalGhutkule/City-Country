import { Link } from "react-router-dom";
import styled from "styled-components";

export const Navbar = () => {

  const Main = styled.div`
    height:50px;
    background-color:#06113C;
    display:flex;
    justify-content:space-evenly;

    & a{
        text-decoration:none;
        color:#DDDDDD;
        padding:1%;
        font-weight:500;
        font-family: 'Roboto', sans-serif;
    }
  `;

  return <Main>
      <Link to={"/"}>Home</Link>
      <Link to={"/add-country"}>Add Country</Link>
      <Link to={"/add-city"}>Add City</Link>
  </Main>;
};
