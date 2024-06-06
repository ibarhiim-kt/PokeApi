import logo from './logo.svg';
import './App.css';
import Home from './Component/Home';
// import PagingPoke from './Component/PagingPoke';
import {BrowserRouter as Router,Routes, Route, useParams } from "react-router-dom";

import Detail from './Component/Detail';

function App() {
  return (
    <Router> 
       <Routes>
        <Route exact path='/' element={<Home/>}/>        
        <Route path='/character/:slug' element={<Detail/>}/>
        </Routes>
    </Router>      
  );
}

export default App;
