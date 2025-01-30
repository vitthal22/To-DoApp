// import { Navigate } from 'react-router-dom';
// import { auth } from './firebase';
// import PropTypes from 'prop-types';

// const PrivateRoute = ({ element }) => {

//   const user = auth.currentUser;

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return element;
// };


// PrivateRoute.propTypes = {
//   element: PropTypes.element.isRequired, 
// };

// export default PrivateRoute;


import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from './firebase';
import PropTypes from 'prop-types';

const PrivateRoute = ({ element }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoading(false); // Set loading to false once Firebase resolves the auth state
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    // Show a loading indicator or nothing while checking auth state
    return <div>Loading...</div>;
  }

  // Redirect to login if no user is logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Render the protected route if user is authenticated
  return element;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
