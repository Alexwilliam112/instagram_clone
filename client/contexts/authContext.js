import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [validAuth, setValidAuth] = useState(false);

    return (
        <AuthContext.Provider value={{ validAuth, setValidAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
