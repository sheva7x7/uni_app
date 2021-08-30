import styles from './App.scss';
import classNames from 'classnames/bind';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from "./components/navbar"
import Login from "./pages/login"
import Home from "./pages/home"
import NotFound from "./pages/notFound"
import Subscription from "./pages/subscription"
import { menuList } from "./constants/AppConstants"

const cx = classNames.bind(styles)

const NavRoute = ({component: Component, path, exact}) => (
    <Route exact={exact} path={path} render={(props) => (
        <div>
          <Navbar menuList={menuList}/>
          <Component className={cx("nav-page")} {...props}/>
        </div>
    )}/> 
)

function App() {
    return (
        <Router>
            <Switch>
                <NavRoute path="/subscription" component={Subscription}/>
                <NavRoute path="/" component={Home} exact />
                <Route path="/login" component={Login} />
                <NavRoute path="*" component={NotFound} />
            </Switch>
        </Router>
    );
}

export default App;
