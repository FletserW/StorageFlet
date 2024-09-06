import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard"

function App() {
  return (
    <Router>
      <Routes>
        {/* Definimos a rota para a página de login */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="signup" element={<SignUp/>}/>
      </Routes>
    </Router>
  );
}

export default App;

