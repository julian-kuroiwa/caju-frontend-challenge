import Router from '~/router';
import { Header } from './components/Header';
import { RegistrationProvider } from './contexts/RegistrationsContext';
  
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <RegistrationProvider>
        <Router />
      </RegistrationProvider>
      <ToastContainer autoClose={5000} />
    </>
  );
}

export default App;
