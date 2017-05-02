import React, { Component } from 'react';

import Round from './round';

class Region extends Component {
  render() {

    console.log("rounds", this.props.rounds);
    console.log("seeds", this.props.seeds);

    if(this.props.name === "Final") {
        return (
            <div>
                <Round
                    number={0}
                    seeds={this.props.seeds}
                    pairings={this.props.rounds[0]}
                    key={0}
                    final={true} />
            </div>
        );
    }

    var rounds = this.props.rounds.map((element, i) =>
        <Round
            number={i}
            seeds={this.props.seeds}
            pairings={element}
            key={i}
            final={false} />
    );

    return (
        <div className={this.props.type === "right" ? "region region-right" : "region"}>
            <h2 className="region-name">{this.props.name}</h2>
            {rounds}
        </div>
    );
  }
}

export default Region;
