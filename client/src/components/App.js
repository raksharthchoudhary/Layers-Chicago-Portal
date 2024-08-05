import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './GlobalComponents/LC_Login';
import Home from './GlobalComponents/LC_Home';
import CustomerInfo from './GlobalComponents/LC_Customers';
import Inventory from './GlobalComponents/LC_Inventory';
//import Message from './PopUpComponents/Messages';
//import { Button, ThemeProvider } from '@mui/material';
//import LC_Theme from './GlobalComponents/LC_Theme';

function App() {

  //const [openComponent, setOpenComponent] = useState(false);

  /* const handleClick = () => {
    setOpenComponent(true);
  }; */

  /*
  <Router>
    <div className="App">
      <Routes>
        <Route path='/test' element={
            <ThemeProvider theme={LC_Theme}>
            <Button onClick={handleClick} variant='contained' color="error">
              {openComponent && <Message openMessage={true} messageType={'error'} messageText={'This is Working!'}/>}
              Open "TEST" Component
            </Button>
            </ThemeProvider>
          }/>
        <Route path="/login" element={<Login />} />
        <Route path="/userProfile" element={<UserInfoTable />} />
        <Route path='/claimRewards' element={<ClaimRewards points={100}/>} />
        </Routes>
        </div>
      </Router>
  */
 
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/home' element={<Home/>} />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/customers' element={<CustomerInfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;