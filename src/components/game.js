import React, { Component } from 'react';

class Game extends Component {
  toTitleCase(str) {
    return str.replace(/\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
  }

  adjustName(name) {
    name = name.replace("-", " ");
    return this.toTitleCase(name);
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

  render() {
    this.getNames();
    return (
        <article className="game">
            <div
                className={this.props.firstSeed === 0 ? "team" : "team team-"+this.ogFirstName}
                data-team={this.props.firstSeed === 0 ? "" : this.ogFirstName} >
                    <span className="team-seed">
                        {this.props.firstSeed === 0 ? "" : this.props.firstSeed}
                    </span>
                    <span className="team-name">
                        {this.props.firstSeed == 0 ? "" : this.firstName}
                    </span>
            </div>

            <div
                className={this.props.ogSecondSeed == 0 ? "team" : "team team-"+this.ogSecondName}
                data-team={this.props.secondSeed == 0 ? "" : this.ogSecondName} >
                    <span className="team-seed">
                        {this.props.secondSeed == 0 ? "" : this.props.secondSeed}
                    </span>
                    <span className="team-name">
                        {this.props.secondSeed == 0 ? "" : this.secondName}
                    </span>
            </div>
        </article>
    );
  }
}

export default Game;
