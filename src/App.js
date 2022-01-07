import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Filter from './component/filter/'
import BrixCal from './component/brixCal';
import StreetAnalysis from './component/streetAnalysis';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return(
    <Router>
      <Routes>
        <Route path ="/" element={<BrixCal/>} />
        <Route exact path ="/SA" element={<StreetAnalysis/>} />
      </Routes>
    </Router>
    // <StreetAnalysis/>
    // <Filter/>
    // <BrixCal/>
  )
}

export default App;
