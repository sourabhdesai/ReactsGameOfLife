import React from 'react';
import {Component} from 'react';
import Cell from './Cell';
import _ from 'lodash';

class Game extends Component {
    constructor(props) {
        super(props);
        const {boardWidth, boardHeight, iterationSleep} = props;
        this.state = {
            boardWidth, boardHeight, iterationSleep,
            heightPerRow: _.round((1 / boardWidth) * 100, 2),
            widthPerCol: _.round((1 / boardHeight) * 100, 2),
            gridStates: _.times(boardHeight, () => _.times(boardWidth, () => Math.round(Math.random())))
        };

        setTimeout(this.updateGridStates.bind(this), iterationSleep);
    }

    /**
     * Game rules from here:
     * https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules
     */
    updateGridStates() {
        const newGridStates = _.times(this.state.boardHeight, (rowIdx) => {
            return _.times(this.state.boardWidth, (colIdx) => {
                const neighbors = [
                    // North
                    this.state.gridStates[this.wrapHeight(rowIdx - 1)][colIdx],
                    // South
                    this.state.gridStates[this.wrapHeight(rowIdx + 1)][colIdx],
                    // East
                    this.state.gridStates[rowIdx][this.wrapWidth(colIdx + 1)],
                    // West
                    this.state.gridStates[rowIdx][this.wrapWidth(colIdx - 1)]
                ];
                const numLiveNeighbors = _.sum(neighbors);
                const isAlive = this.state.gridStates[rowIdx][colIdx];
                const nextLife = isAlive ? numLiveNeighbors === 2 || numLiveNeighbors === 3 : numLiveNeighbors === 3;
                return Number(nextLife);
            });
        });
        this.setState({gridStates: newGridStates}, () => {
            console.log('updated state');
            setTimeout(this.updateGridStates.bind(this), this.state.iterationSleep);
        });
    }

    wrapHeight(rowIdx) {
        return this.wrapIndex(rowIdx, this.state.boardHeight);
    }

    wrapWidth(colIdx) {
        return this.wrapIndex(colIdx, this.state.boardWidth);
    }

    wrapIndex(idx, length) {
        idx = idx % length;
        return idx >= 0 ? idx : length + idx;
    }

    onCellClick(rowIdx, colIdx) {
        this.state.gridStates[rowIdx][colIdx] = !this.state.gridStates[rowIdx][colIdx];
        this.setState({gridStates: this.state.gridStates});
    }

    generateRows() {
        return _.flatten(_.times(this.state.boardHeight, (rowIdx) => {
            return _.times(this.state.boardWidth, (colIdx) => {
                const style = {
                    display: 'inline-grid',
                    gridRowStart: rowIdx,
                    gridRowEnd: rowIdx + 1,
                    gridColumnStart: colIdx,
                    gridColumnEnd: colIdx + 1,
                };
                return (
                    <div style={style} key={`${rowIdx}-${colIdx}`} onClick={() => this.onCellClick(rowIdx, colIdx)}>
                        <Cell isAlive={this.state.gridStates[rowIdx][colIdx]} />
                    </div>
                );
            });
        }));
    }

    render() {
        const style = {height: '100vh', width: '100vw', display: 'grid'};
        return (
            <div style={style}>
                {this.generateRows()}
            </div>
        );
    }
}

export default Game;
