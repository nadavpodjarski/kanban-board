import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import DynamicModal from "./components/DynamicModal";

import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Main />
        <Footer />
        <DynamicModal />
      </div>
    </Provider>
  );
}
