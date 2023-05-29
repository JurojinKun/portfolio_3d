import "./translations/i18n";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./redux/store";


const App = () => {
  // var lang = window.navigator.language;
  // console.log(lang); // Retourne quelque chose comme 'en-US'

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
