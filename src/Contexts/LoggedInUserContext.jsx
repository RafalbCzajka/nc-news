import {createContext, useContext, useState} from "react";

const LoggedInUserContext = createContext();

export function LoggedInUserProvider({children}) {
    const [loggedInUser, setLoggedInUser] = useState("guest"); //Hard coded existing user for now

    return (
        <LoggedInUserContext.Provider value={{loggedInUser, setLoggedInUser}}>
            {children}
        </LoggedInUserContext.Provider>
    )
}

export function useLoggedInUser() {
    return useContext(LoggedInUserContext);
}