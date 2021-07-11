import React from 'react';
// import './App.css';
import Navbar from './Component/Navbar';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import BlogList from './Component/BlogList';
import CreateBlog from './Component/CreateBlog';
import BlogDetail from './Component/BlogDetail';
import BlogEdit from './Component/BlogEdit';
import Register from './Component/Register';
import Signin from './Component/Signin';
import {AppStateContext} from './Component/BlogList';




const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path='/signup' component={Register} />
        <Route exact path='/signin' component={Signin} />
          <div>
        <Navbar />
        <Route exact path='/detail/:id' component={BlogDetail}/>
        <Route exact path='/' component={BlogList}/>
        <Route exact path='/update/:id' component={BlogEdit}/>
        <Route exact path='/createblog/' component={CreateBlog}/>
        </div>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
