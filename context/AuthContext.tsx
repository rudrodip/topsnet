'use client'

import React, { ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@src/firebase/config';

// Export the AuthContext interface to define the context value type
export interface AuthContextType {
  user: User | null;
}

// Create the AuthContext with a default value
export const AuthContext = React.createContext<AuthContextType>({ user: null });

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading ? children : null}
    </AuthContext.Provider>
  );
};





