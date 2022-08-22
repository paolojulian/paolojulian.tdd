import { ChakraProvider } from '@chakra-ui/react';
import { LoginScreen } from './LoginScreen';
import { InboxScreen } from './pages/InboxScreen';
import { theme } from './theme';
import { useAuth } from './useAuth';

function App() {
  const [user, logIn] = useAuth();

  return (
    <ChakraProvider theme={theme}>
      {user?.token ? <InboxScreen /> : <LoginScreen onLogIn={logIn} />}
    </ChakraProvider>
  );
}

export default App;
