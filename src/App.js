import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Filter from './component/filter/'
import BrixCal from './component/brixCal';
import StreetAnalysis from './component/streetAnalysis';
import { BrowserRouter as Router, Route, Routes, HashRouter } from 'react-router-dom';

function App() {
  return(
    <HashRouter>
      <Routes>
        <Route exact path ="/" element={<BrixCal/>} />
        <Route exact path ="/SA" element={<StreetAnalysis/>} />
      </Routes>
    </HashRouter>
    /*
    // <StreetAnalysis/>
    // <Filter/>
    // <BrixCal/>
    */
  )
}

export default App;
