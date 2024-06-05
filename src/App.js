import logo from './logo.svg';
import './App.css';
import Home from './Component/Home';
// import PagingPoke from './Component/PagingPoke';
import {BrowserRouter as Router, Route, useParams ,} from "react-router-dom";
import Switch from "react-router-dom";
import Detail from './Component/Detail';

function App() {
  return (
    <Router>
    
        {/* <Route path='/'> */}
        <Home/>
        {/* </Route> */}
        {/* <Route path='/Detail/:productId' Component={Detail} />           */}
        
    </Router>
  );
}

export default App;
