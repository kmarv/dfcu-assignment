import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ViewStaff from './components/staff/ViewStaff';
import AddStaff from './components/staff/AddStaff';
import GenerateAuthCode from './components/staff/GenerateAuthCode';


function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/staff' element={<ViewStaff/>} />
      <Route path='/staff/register' element={<AddStaff/>} />
     </Routes>
    </div>
  );
}

export default App;
