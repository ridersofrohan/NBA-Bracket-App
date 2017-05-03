import React, { Component } from 'react';
import Game from './game';

class Round extends Component {
  convertToTuples() {
    var response = [];
    for(var i = 0; i < this.props.pairings.length; i += 2) {
      response.push([this.props.pairings[i], this.props.pairings[i+1]]);
    }
    return response;
  }

  render() {
    var games = this.convertToTuples().map((element, i) =>
      <Game
        seeds={this.props.seeds}
        firstSeed={element[0]}
        secondSeed={element[1]}
        gamesPredicted={this.props.gamesPredicted[i]}
        firstSeedPredicted={this.props.pairingsPredicted ? this.props.pairingsPredicted[(i*2)] : element[0]}
        secondSeedPredicted={this.props.pairingsPredicted ? this.props.pairingsPredicted[(i*2)+1] : element[1]}
        games={this.props.games[i]}
        final={this.props.final}
        key={i} />
    );

    var finalText = this.props.final ? this.props.champion + " WINS!" : "";

    return (
      <section className={"round " + (this.props.final ? "final" : "") + " round-" + this.props.number}>
        {games}
      </section>
    );
  }
}

export default Round;
