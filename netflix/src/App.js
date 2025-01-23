
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Sign from './components/Sign'

import Main from './components/Main';
import Moviedetail from './components/Moviedetail';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/signin" element={<Sign/>}/>
        <Route path="/moviedetail" element={<Moviedetail/>}/>
      </Routes>
    
    
    </div>
  );
}

export default App;
