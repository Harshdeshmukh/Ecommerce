//Packages
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch,Route, Redirect} from 'react-router-dom';

//Css
import './App.css';
import Cancel from './pages/Cancel';
//Pages
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Success from './pages/Success';

function App() {

  const user=useSelector((state)=>state.user.currentUser);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" >
            <Home />
          </Route>
          <Route  path="/products" >
            <ProductList/>
          </Route>
          <Route  path="/product/:id" >
            <Product/>
          </Route>
          <Route  path="/cart" >
            <Cart/>
          </Route>
          <Route  path="/login" >
            {user ? <Redirect to="/"/>: <Login/>}
          </Route>
          <Route  path="/register" >
          {user ? <Redirect to="/"/>: <Register/>}
          </Route>
          <Route path="/success">
            <Success/>
          </Route>
          <Route path="/cancel">
            <Cancel/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
