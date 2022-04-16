
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AddCity } from './Component/AddCity';
import { AddCountry } from './Component/AddCountry';
import { EditCity } from './Component/EditCity';
import { Home } from './Component/Home';
import { Navbar } from './Component/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add-country' element={<AddCountry/>}/>
        <Route path='/add-city' element={<AddCity/>}/>
        <Route path='/editCity/:id' element={<EditCity/>}/>
      </Routes>
    </div>
  );
}

export default App;
