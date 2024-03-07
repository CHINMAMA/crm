import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home.jsx'
import Login from './pages/login/login.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sign-in' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
