import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Components/Login";
import HomePage from "./Components/Home/Home";
import SignUp from './Components/SignUp';

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route  path='/' element={<Login/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
   <Route path="/homepage" element={<HomePage/>}/>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
