import { useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";






export function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(""); // State for error messages
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    




    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("user sucessfully login");
            setMessage("Login successful! Redirecting...");
            
            navigate("/TaskForm")
            
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                setMessage("Invalid crendential");
              }else {
                setMessage(error.message);
              }
            
        }

        
    }

    return(
        <>
            <div className="container mt-5">
                  <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                      <h2 className="text-center mb-4">Login</h2>
                      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Enter Email
                          </label>
                          <input type="email" id="email" className="form-control" placeholder="Enter your email"  onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                            Enter Password
                          </label>
                          <div className="input-group">
                         <input type={showPassword ? "text" : "password"} id="password" className="form-control" placeholder="Enter your password"  onChange={(e) => setPassword(e.target.value)}  />
                         <span className="input-group-text bg-light" style={{ cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)} >
                          <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                         </span>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                          Sign In
                        </button>
                      </form>

                      {message && (
              <div className="alert alert-info mt-3 text-center">
                {message}
              </div>
            )}

                      <div className="text-center mt-3">
                        <p>
                          Already have an account? <Link to="/SignUp">SignUp</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
        </>
    )
}