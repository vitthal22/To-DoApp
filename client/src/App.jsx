import TaskForm from "./components/TaskForm";
// import NavBar from "./components/NavBar";



import { SignUp } from "./components/SignUp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";





const App = () => {

    
    

    return (
        <>

          {/* <SignUp></SignUp> */}
        
          <BrowserRouter>
            
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/TaskForm" element={<PrivateRoute element={<TaskForm />} />}></Route>

              </Routes>
            
          </BrowserRouter>
          {/* <LoginPage></LoginPage> */}
          {/* <TaskForm></TaskForm> */}
          
        </>
    );
};

export default App;