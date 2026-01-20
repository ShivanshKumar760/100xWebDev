import { createContext, useReducer } from "react";

const INITIAL_STATE = {//intial state of city ,date and options
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INITIAL_STATE);//here we are creating a 
//context


/*

The Context API in React is a powerful feature that allows you to manage and share 
state across your entire application (or parts of it) without having to pass props 
down manually through every level of the component tree. It helps avoid prop 
drilling, where you need to pass data through intermediate components that don’t 
necessarily need it, just to reach a deep child component
*/

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};


















