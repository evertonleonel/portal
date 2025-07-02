import { createContext, type ReactNode, useContext, useState } from 'react';

interface ViewTabState {
  sucess: boolean;
}

interface AuthContextType {
  viewTabState: ViewTabState;
  handleUpdateViewForm: (newState: ViewTabState) => void;
}

const SigninContext = createContext<AuthContextType | undefined>(undefined);

interface SigninProviderProps {
  children: ReactNode;
}

export const SigninProvider = ({ children }: SigninProviderProps) => {
  const [viewTabState, setViewTabState] = useState<ViewTabState>({
    sucess: false,
  });

  const handleUpdateViewForm = (newState: ViewTabState) => {
    setViewTabState(prev => ({
      ...prev,
      ...newState,
    }));
  };

  return <SigninContext.Provider value={{ viewTabState, handleUpdateViewForm }}>{children}</SigninContext.Provider>;
};

export const useSigninContext = (): AuthContextType => {
  const context = useContext(SigninContext);
  if (context === undefined) {
    throw new Error('useSigninContext deve ser usado dentro de um SigninProvider');
  }
  return context;
};
