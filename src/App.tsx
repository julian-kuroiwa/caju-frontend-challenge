import Router from "~/router";
import { Header } from "./components/Header";
import { RegistrationProvider } from "./contexts/RegistrationsContext";

function App() {
  return (
    <>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <RegistrationProvider>
        <Router />
      </RegistrationProvider>
    </>
  );
}

export default App;
