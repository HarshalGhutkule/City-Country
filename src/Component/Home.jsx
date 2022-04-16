import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { addDataToRedux } from '../Redux/Action';
import Button from "@mui/material/Button";

const Main = styled.div`
    & h1{
        font-family: 'Roboto', sans-serif;
    }
    & a{
        text-decoration:none;
        text-align:auto;
        color:black;
        font-weight:500;
    }
    & .filter{
        height:30px;
        display:flex;
        gap:0 5%
    }
    & .deleteBtn{
        cursor:pointer;
        font-weight:500;
    }
  `;

export const Home = ()=>{

let reduxData = useSelector((store)=>store.city);
const [data, setData] = React.useState(reduxData);

React.useEffect(()=>{
    getData();
},[])

const diapatch = useDispatch();

const getData = () => {
    axios.get("https://city--country.herokuapp.com/city").then((res) => {
      setData(res.data);
      diapatch(addDataToRedux(res.data));
    });
  };

  const deleteCity = (id)=>{
    axios.delete(`http://localhost:8080/city/${id}`).then((res) => {
        getData();
    });
  }

  const sorting = (a)=>{
    if(a === 1){
        reduxData.sort((a,b)=>a.population-b.population);
        setData([...reduxData]);
    }
    else{
        reduxData.sort((a,b)=>b.population-a.population);
        setData([...reduxData]);
    }
  }

  const sortingByName = ()=>{

    reduxData.sort((a,b)=>{
        if(b.country.toLowerCase()>a.country.toLowerCase()) 
        return -1
    });
    setData([...reduxData]);
    
  }


  return (
      <Main>
          <h1>CITY COUNTRY</h1>
          <div className='filter'>
            <Button variant="contained" onClick={()=>sortingByName()}>Filter by Country</Button>
            <Button variant="contained" onClick={()=>sorting(1)}>Population Asc</Button>
            <Button variant="contained" onClick={()=>sorting(-1)}>Population Desc</Button>
          </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >id</TableCell>
            <TableCell align="center">Country</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">Population</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.country}</TableCell>
              <TableCell align="center">{row.cityName}</TableCell>
              <TableCell align="center">{row.population}</TableCell>
              <TableCell align="center"><Link to={`/editCity/${row.id}`}>Edit</Link></TableCell>
              <TableCell align="center" className='deleteBtn' onClick={()=>deleteCity(row.id)}>Delete</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Main>
  );
}
