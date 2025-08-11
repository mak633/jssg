import { createContext, useContext, useState } from 'react';

type GenericContextType<T> = { state?: T; setState?: (s: T) => void };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GenericContext = createContext<GenericContextType<any>>({
  state: undefined,
  setState: undefined,
});

function useGenericContext<T>() {
  const context = useContext<GenericContextType<T>>(GenericContext);
  if (context === undefined) {
    throw new Error('useGenericContext must be used within a GenericProvider');
  }

  return context;
}

type GenericProviderProps<T> = {
  initialState: T;
  children: React.ReactNode;
};

const GenericProvider = <T,>({
  initialState,
  children,
}: GenericProviderProps<T>) => {
  const [state, setState] = useState<T>(initialState);

  return (
    <GenericContext.Provider value={{ state, setState }}>
      {children}
    </GenericContext.Provider>
  );
};

export { useGenericContext, GenericProvider, GenericContext };
