import React, { Component } from 'react';

class GameSelector extends Component {
  createOptions() {
    var response = [];
    for(var i = 1; i < 8; i++) {
      if(this.props.games && i-1 < this.props.games.length && this.props.seeds) {
        var seed = this.props.games[i-1];
        if(seed in this.props.seeds) {
          if(i === this.props.gamesPredicted) {
            response.push(
              [seed, "game-option predicted background-"+this.props.seeds[seed]["name"]]
            );
          }
          else {
            response.push(
              [seed, "game-option background-"+this.props.seeds[seed]["name"]]
            );
          }
        }
        else {
          if(i === this.props.gamesPredicted) {
            response.push(
              [seed, "game-option predicted unplayed"]
            );
          }
          else {
            response.push(
              [i-1, "game-option"]
            );
          }
        }
      }
      else {
        if(i === this.props.gamesPredicted) {
          response.push(
            [seed, "game-option predicted unplayed"]
          );
        }
        else {
          response.push(
            [i-1, "game-option"]
          );
        }
      }
    }
    return response;
  }

  render() {
    var options = this.createOptions().map((element, i) =>
      <span className={element[1]} value={element[0]} key={i}>
        {i+1}
      </span>
    );

    return (
      <div className="game-selector">
        {options}
      </div>
    );
  }
}
export default GameSelector;
