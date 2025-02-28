export const Auth0Provider = ({ children }) => children;

export const useAuth0 = () => ({
  user: { name: 'Test User', email: 'test@example.com' },
  authorize: jest.fn(),
  clearSession: jest.fn(),
  getCredentials: jest.fn(),
  isAuthenticated: true,
});