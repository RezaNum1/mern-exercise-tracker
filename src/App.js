import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import ExercisesList from './components/exercisesList';
import CreateExercises from './components/createExercises';
import CreateUser from './components/createUser';
import EditExercises from './components/editExercises';

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar/>
      <br />
      <Route path="/" exact component={ExercisesList}/>
      <Route path="/edit/:id" component={EditExercises}/>
      <Route path="/create" component={CreateExercises}/>
      <Route path="/user" component={CreateUser}/>
      </div>
      
    </Router>  
  );
}

export default App;
