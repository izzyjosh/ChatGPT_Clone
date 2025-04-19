import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/AuthComponents/Login";
import Register from "./components/AuthComponents/Register";
import AuthLayout from "./components/AuthComponents/AuthLayout";
import { ToastContainer } from "react-toastify";
import ProtectedRoute  from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
