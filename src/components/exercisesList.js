import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Exercise = (props) => {
    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0, 10)}</td>
            <td>
                <Link to={`/edit/${props.exercise._id}`}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
            </td>
        </tr>
    )
}

export default class ExercisesList extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.deleteExercises = this.deleteExercises.bind(this);

        this.state = {
            exercises: []
        }
    }

    componentDidMount() {
        this._isMounted = true;
        axios.get('http://localhost:5000/exercises/')
            .then(res => {
                if(this._isMounted){
                    this.setState({
                        exercises: res.data
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    deleteExercises(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res));
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercises} key={currentExercise._id} />
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}