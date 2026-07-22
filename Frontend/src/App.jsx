
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import CreateForm from "./pages/CreateForm";
import PreviewForm from "./pages/PreviewForm";
import FillForm from "./pages/FillForm";
import Responses from "./pages/Responses";

function App() {
  return (<>

    <Navbar />
    
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/create" element={<CreateForm />} />

      <Route path="/preview" element={<PreviewForm />} />

      <Route path="/form/:id" element={<FillForm />} />

      <Route path="/responses/:id" element={<Responses />} />

    </Routes>
    </>

  );
}

export default App;