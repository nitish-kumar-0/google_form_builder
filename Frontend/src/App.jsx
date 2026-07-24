
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
// import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import CreateForm from "./pages/CreateForm";
import PreviewForm from "./pages/PreviewForm";
import FillForm from "./pages/FillForm";
import Responses from "./pages/Responses";
import Dashboard from "./pages/Dashboard";


function App() {
  return (<>

    
    
    <Routes>

      <Route path="/" element={<Home />} />

      

      <Route path="/preview" element={<PreviewForm />} />

      <Route path="/preview/:id" element={<PreviewForm />} />

      <Route path="/form/:id" element={<FillForm />} />

      

      <Route path="/responses/:id" element={<Responses />} />

      

     

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />

    <Route

        path="/dashboard"

        element={

            <ProtectedRoute>

                <Dashboard />

            </ProtectedRoute>

        }

    />

    <Route

        path="/create"

        element={

            <ProtectedRoute>

                <CreateForm />

            </ProtectedRoute>

        }

    />

    <Route

        path="/edit/:id"

        element={

            <ProtectedRoute>

                <CreateForm />

            </ProtectedRoute>

        }

    />

    </Routes>
    </>

  );
}

export default App;