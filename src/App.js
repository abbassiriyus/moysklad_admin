
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Construction from "./pages/Construction";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Zakaz from "./pages/Zakaz";


import Main from "./components/layout/Main";
// import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { useState } from "react";
import CardsProduct from "./pages/CardsProduct";
import MarkaAndSponsor from "./pages/MarkaAndSponsor";

function App() {
  const [token,setToken]=useState(sessionStorage.getItem("token"))
  return (
    <div className="App">
      <Switch>
       
         {token?( <Main>
          <Route exact path="/" component={Home} />
           <Route exact path="/dashboard" component={Home} />
           <Route exact path="/zakaz" component={Zakaz} />
           <Route exact path="/tables" component={Users} />
           <Route exact path="/Products" component={CardsProduct} />
           <Route exact path="/Construction" component={Construction} />
           <Route exact path="/profile" component={Profile} />
           <Route exact path="/configProduct" component={MarkaAndSponsor} />
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
