import { auth } from './firebase';
import './style.css'

function NavBar() {

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <>
      <nav className="navbar bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
    <a className="navbar-brand" href="#">To-Do App</a>
    <a className="navbar-brand btn btn-danger navbtn" role="button" onClick={handleLogout} >Logout</a>
    
    
  </div>
      </nav>



      
    </>
  );
}

export default NavBar;
