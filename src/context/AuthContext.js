import React, { useState } from 'react';

const AuthContext = React.createContext({
  isSignedIn: false,
  signIn: null,
  user: null
});

const AuthContextProvider = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(false);

  const setUserToContext = (data) => {
    setUser(data);
  };

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
        setIsAuth,
        isAuth,
        setUserToContext,
        user
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
