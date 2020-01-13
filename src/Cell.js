import React from 'react';
import {Component} from 'react';
import './Cell.css';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {isAlive: props.isAlive};
        this.onCellClick = props.onCellClick;
    }

    componentWillReceiveProps({isAlive}) {
        this.setState({isAlive: isAlive});
    }

    render() {
        return <div onClick={this.onCellClick} className={`game-cell ${this.state.isAlive ? 'alive' : 'dead'}`}></div>;
    }
}

export default Cell;
