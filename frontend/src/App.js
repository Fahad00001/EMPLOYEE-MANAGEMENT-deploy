// import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom'
import Employeemanageapp from './Components/Employeemanageapp';
import Employeedetails from './Components/Employeedetails';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="employee"/>}/>
        <Route path='/employee' element={<Employeemanageapp/>}/>
        <Route path='/employee/:id' element={<Employeedetails/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
