import React, {  createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) =>{
    const [user, setUser] = useState(null);

    const loginUser = (userData) =>{
        setUser(userData);
    };

    const logoutUser =()=>{
        setUser(null);
    }

    useEffect(() =>{
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if(storedUser){
            setUser(storedUser);
        }
    }, []);

    return (
        <UserContext.Provider value={{user,loginUser,logoutUser}}>
            {children}
        </UserContext.Provider>
    )
}