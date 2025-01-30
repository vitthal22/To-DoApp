import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
  


export function SignUp(){

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(""); // State for user messages
  const navigate = useNavigate(); // For navigation
  const [showPassword, setShowPassword] = useState(false);
  

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        const user = auth.currentUser;
        console.log(user);

        if (user) {
            
            await setDoc(doc(db, "Users", user.uid), {
              userName: name,
              email: user.email,
            });
    
            setMessage("User registered successfully! Redirecting to login...");
            
              navigate("/"); 
            
          }
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            setMessage("This email is already in use.");
          } else {
            setMessage(error.message); 
          }
        }
        
    }
    

  

    return(
        
        <>
        <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Enter Username
              </label>
              <input type="text" id="username" className="form-control" placeholder="Enter your username" onChange={(e) => setName(e.target.value)}/>
            </div>
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
              <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="input-group-text bg-light"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </span>
                  </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>
          </form>

          {message && (
              <div className="alert alert-info mt-3 text-center">
                {message}
              </div>
            )}
          <div className="text-center mt-3">
            <p>
              Already have an account? <Link to="/">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>


      
            
        </>
        
    )
}