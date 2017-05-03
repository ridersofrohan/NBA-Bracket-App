import React, { Component } from 'react';
import Round from './round';

class Region extends Component {
  render() {

    if(this.props.name === "Final") {
      return (
        <Round
          seeds={this.props.seeds}
          pairings={this.props.rounds[0]}
          games={this.props.games[0]}
          gamesPredicted={this.props.userData["games"][0]}
          pairingsPredicted={this.props.userData["matchups"][0]}
          final={true}
          number={0}
          key={0} />
      );
    }

    var rounds = this.props.rounds.map((element, i) =>
      <Round
        seeds={this.props.seeds}
        pairings={element}
        games={this.props.games[i]}
        gamesPredicted={this.props.userData["games"][i]}
        pairingsPredicted={this.props.userData["matchups"][i]}
        final={false}
        number={i}
        key={i} />
    );

    console.log("region");
    return (
      <div className={this.props.type === "right" ? "region region-right" : "region"}>
        <h2 className="region-name">{this.props.name}</h2>
        {rounds}
      </div>
    );
  }
}
export default Region;
