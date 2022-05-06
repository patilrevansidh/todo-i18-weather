import "./App.css";
import AppContainer from "./components/Layout/AppContainer";
import Locale from "./config/HOC/locale";
import { withNetworkHandler } from "./config/HOC/networkHandler/networkHandler";
import ToDo from './views/todos';

const MainApp = ({ networkStatus }) => {
  return (
      <AppContainer>
        <ToDo/>
      </AppContainer>
  );
};

function App(props) {
  return (
    <Locale>
      <MainApp />
    </Locale>
  );
}

export default withNetworkHandler(App);
