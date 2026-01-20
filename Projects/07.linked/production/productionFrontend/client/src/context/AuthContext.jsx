// import { createContext, useEffect, useReducer } from "react";
// import AuthReducer from "./AuthReducer";

// const INITIAL_STATE = {
//   user:JSON.parse(localStorage.getItem("user")) || null,
//   isFetching: false,//beginning and the ending of the process
//   error: false,
// };

// /*eslint-disable*/
// export const AuthContext = createContext(INITIAL_STATE);//this will create the context container

// /* eslint-disable react/prop-types */
// //this is the provider wrapper which will wrap our component
// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
//   useEffect(()=>{
//     localStorage.setItem("user", JSON.stringify(state.user))
//   },[state.user])
  
//   return (
//     <AuthContext.Provider
//       value={{
//         user: state.user,
//         isFetching: state.isFetching,
//         error: state.error,
//         dispatch,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { Logout } from "./AuthActions";  // Import the Logout action
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};
/*eslint-disable*/

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);


  useEffect(() => {
    // Whenever the user state changes, update localStorage
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, [state.user]);

  // Logout function: Clears user from both context and localStorage
  const handleLogout = () => {
    dispatch(Logout());  // Dispatch the logout action to reset the state
    localStorage.removeItem("user");  // Remove user from localStorage
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        handleLogout,  // Provide the handleLogout function to components
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
