import { createContext, useState } from "react";

interface CurrentUserContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const UserContext = createContext<CurrentUserContextType | null>(null);

const UserContextProvider = ({ children }:any) => {
  const [token, setToken] = useState<string | null>(null);

  const contextValue: CurrentUserContextType = {
    token,
    setToken,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
