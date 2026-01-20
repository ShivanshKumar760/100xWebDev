export const LoginStart = (userCredentials) => {
    console.log(userCredentials);
    return {type: "LOGIN_START"}
};
  
  export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
  });
  
  export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
  });
  
  export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
  });
  
  export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
  });

  export const Logout = () => ({
    type: "LOGOUT",  // You should add a "LOGOUT" action type
  });
  