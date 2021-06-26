import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AuthCOntextProvider } from "./contexts/AuthContext";

import './styles/global.scss';
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

function App() {
  return (
    <BrowserRouter>
      <AuthCOntextProvider>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/rooms/new" component={NewRoom}></Route>
            <Route path="/rooms/:id" component={Room}></Route>
            <Route path="/admin/rooms/:id" component={AdminRoom}></Route>
          </Switch>
        </AuthCOntextProvider>
    </BrowserRouter>
  );
}

export default App;
