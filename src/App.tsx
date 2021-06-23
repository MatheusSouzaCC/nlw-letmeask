import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { BrowserRouter, Route } from "react-router-dom";

import { AuthCOntextProvider } from "./contexts/AuthContext";

import './styles/global.scss';

function App() {

  

  return (
    <BrowserRouter>
      <AuthCOntextProvider>
          <Route path="/" exact component={Home}></Route>
          <Route path="/rooms/new" component={NewRoom}></Route>
        </AuthCOntextProvider>
    </BrowserRouter>
  );
}

export default App;
