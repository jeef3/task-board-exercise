import { AppBody, AppContainer } from "./components/atoms/AppAtoms";
import AppHeader from "./components/AppHeader";
import Board from "./components/BoardStatusColumns";
import Menu from "./components/Menu";

export default function App() {
  return (
    <AppContainer>
      <AppHeader />

      <AppBody>
        <Menu />
        <Board />
      </AppBody>
    </AppContainer>
  );
}
