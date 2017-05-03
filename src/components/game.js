import React, { Component } from 'react';

import Team from './team';
import GameSelector from './gameselector';

class Game extends Component {
  adjustName(name) {
    name = name.replace("-", " ");
    return name.replace(/\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  getNames() {
    if (this.props.firstSeed !== 0) {
      var firstName = this.props.seeds[this.props.firstSeed];
      this.ogFirstName = firstName;
      this.firstName = this.adjustName(firstName);
    }

    if (this.props.secondSeed !== 0) {
      var secondName = this.props.seeds[this.props.secondSeed];
      this.ogSecondName = secondName;
      this.secondName = this.adjustName(secondName);
    }
  }

  getNamesPredicted() {

    if(this.props.final) {
      var firstSeed = this.props.firstSeedPredicted;
      var firstName = this.props.seeds[firstSeed[0]][firstSeed[1]];
      this.ogFirstNamePredicted = firstName;
      this.firstNamePredicted = this.adjustName(firstName);

      var secondSeed = this.props.secondSeedPredicted;
      var secondName = this.props.seeds[secondSeed[0]][secondSeed[1]];
      this.ogSecondNamePredicted = secondName;
      this.secondNamePredicted = this.adjustName(secondName);
    }
    else {
      var firstName = this.props.seeds[this.props.firstSeedPredicted];
      this.ogFirstNamePredicted = firstName;
      this.firstNamePredicted = this.adjustName(firstName);

      var secondName = this.props.seeds[this.props.secondSeedPredicted];
      this.ogSecondNamePredicted = secondName;
      this.secondNamePredicted = this.adjustName(secondName);
    }
  }

  summarize() {
    var response = {};
    response[this.props.firstSeed] = {
      name: this.ogFirstName
    };
    response[this.props.secondSeed] = {
      name: this.ogSecondName
    };
    return response;
  }

  render() {
    this.getNames();

    if(this.props.firstSeedPredicted) {
      this.getNamesPredicted();
    }
    else {
      this.ogFirstNamePredicted = "";
      this.firstNamePredicted = "";
      this.ogSecondNamePredicted = "";
      this.secondNamePredicted = "";
    }

    return (
      <article className="game">
        <Team
          name={this.ogFirstName}
          namePredicted={this.ogFirstNamePredicted}
          displayName={this.firstName}
          displayNamePredicted={this.firstNamePredicted}
          seed = {this.props.firstSeed}
          seedPredicted = {this.props.final ? this.props.firstSeedPredicted[1] : this.props.firstSeedPredicted} />

        <Team
          name={this.ogSecondName}
          namePredicted={this.ogSecondNamePredicted}
          displayName={this.secondName}
          displayNamePredicted={this.secondNamePredicted}
          seed = {this.props.secondSeed}
          seedPredicted = {this.props.final ? this.props.secondSeedPredicted[1] : this.props.secondSeedPredicted} />

        <GameSelector
          games={this.props.games}
          seeds={this.summarize()}
          gamesPredicted={this.props.gamesPredicted} />
      </article>
    );
  }
}
export default Game;
