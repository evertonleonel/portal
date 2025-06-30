import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

export type UserRole = 'admin' | 'client' | 'user';

interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasPermission: (requiredRoles: string[]) => boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há token salvo no localStorage
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Erro ao recuperar dados do usuário:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }

    setIsLoading(false);
  }, []);

  const hasPermission = (requiredRoles: string[]): boolean => {
    if (!user) return false;

    // Se não há roles requeridas ou está vazio, permite acesso
    if (!requiredRoles || requiredRoles.length === 0 || requiredRoles.includes('')) {
      return true;
    }

    // Verifica se o usuário tem pelo menos uma das roles necessárias
    return requiredRoles.some(role => user.roles.includes(role as UserRole));
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Aqui você faria a chamada para sua API de autenticação
      // Por enquanto, vou simular uma autenticação com diferentes roles
      if (email && password) {
        // Simulação de diferentes usuários com diferentes permissões
        let mockUser: User;

        if (email.includes('admin')) {
          mockUser = {
            id: '1',
            name: 'Admin User',
            email: email,
            roles: ['admin', 'client', 'user'], // Admin tem todas as permissões
          };
        } else if (email.includes('client')) {
          mockUser = {
            id: '2',
            name: 'Client User',
            email: email,
            roles: ['client', 'user'], // Client tem permissões limitadas
          };
        } else {
          mockUser = {
            id: '3',
            name: 'Regular User',
            email: email,
            roles: ['user'], // Usuário comum
          };
        }

        const mockToken = 'mock-jwt-token';

        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('userData', JSON.stringify(mockUser));
        setUser(mockUser);

        return true;
      }

      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    hasPermission,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
