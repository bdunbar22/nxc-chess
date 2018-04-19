/* Copyright 2016 Novartis Institutes for BioMedical Research Inc. Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License. */
import React, { Component, PropTypes as Type } from 'react';
import { connect } from 'react-redux';

class DistancdTravelled extends Component {
    static propTypes = {
        completedMoves: Type.array,
    };

    getDistance(move) {
        let distance = 0;
        if (move.newCol === move.oldCol) {
            distance = Math.abs(move.newRow - move.oldRow);
        } else if (move.newRow === move.oldRow) {
            distance = Math.abs(move.newCol - move.oldCol);
        } else if (Math.abs(move.newRow - move.oldRow) === Math.abs(move.newCol - move.oldCol)) {
            // Diagonal will just be counted 1 per diagonal square
            distance = Math.abs(move.newRow - move.oldRow);
        } else {
            // Knight
            distance = 3;
        }
        return distance;
    }

    renderDistance() {
        let whiteDistance = 0;
        let blackDistance = 0;
        return (move, number) => {
            const turn = number + 1; // Start at 1 not 0.
            const color = move.color;
            let displayDistance;

            if (color === 'black') {
                blackDistance += this.getDistance(move);
                displayDistance = blackDistance;
            } else {
                whiteDistance += this.getDistance(move);
                displayDistance = whiteDistance;
            }

            const string = `${turn}. ${color}: ${displayDistance}`;
            const key = string; // Enforced uniqueness by move and turn number.
            return (
                <div key={key} style={{ fontSize: '10px' }}>
                    {string}
                </div>);
        };
    }

    render() {
        const { completedMoves } = this.props;
        const renderMove = this.renderDistance();
        const moveViews = completedMoves.map((move, i) => renderMove(move, Math.floor(i / 2)));

        return (
            <div style={{ overflow: 'hidden', padding: '10px', paddingTop: '0px', width: '200px', float: 'left' }}>
                <h2 style={{ marginTop: '0px', marginBottom: '5px' }} > Distance Travelled </h2>
                {moveViews}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { completedMoves: state.pieces.completedMoves };
}

export default connect(mapStateToProps)(DistancdTravelled);
