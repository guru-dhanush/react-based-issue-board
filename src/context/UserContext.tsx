import React, { createContext, useContext, ReactNode } from "react";
import { User } from "../types";
import { currentUser as defaultUser } from "../constants/currentUser";

//User context for providing current user and role info
//we can implement user role based access control
//just for case study purpose I'm using default user

interface UserContextType {
  currentUser: User;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  user?: User;
}

export function UserProvider({
  children,
  user = defaultUser,
}: UserProviderProps) {
  return (
    <UserContext.Provider value={{ currentUser: user }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
