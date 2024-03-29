
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import './pages/style.css'
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { useState } from "react";
function App() {
  const [token,setToken]=useState(sessionStorage.getItem("token"))
  return (
    <div className="App">
      <Switch>
         {token?( <Main>
          <Route exact path="/" component={Home} />
           <Route exact path="/dashboard" component={Home} />
           <Route exact path="/tables" component={Users} />
           <Route exact path="/profile" component={Profile} />
           <Redirect from="*" to="/" />
           </Main>
         ):(
      <div>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/login" component={SignIn} />
          <Redirect from="*" to="/" />
      </div>
         )}
        
      </Switch>
    </div>
  );
}

export default App;
