
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import CreateForm from "./pages/CreateForm";
import PreviewForm from "./pages/PreviewForm";
import FillForm from "./pages/FillForm";
import Responses from "./pages/Responses";
import Dashboard from "./pages/Dashboard";


function App() {
  return (<>

    <Navbar />
    
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/create" element={<CreateForm />} />

      <Route path="/preview" element={<PreviewForm />} />

      <Route path="/preview/:id" element={<PreviewForm />} />

      <Route path="/form/:id" element={<FillForm />} />

      

      <Route path="/responses/:id" element={<Responses />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/edit/:id" element={<CreateForm />} />

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />

    </Routes>
    </>

  );
}

export default App;