import React, { Component } from 'react';

class Team extends Component {
  constructor() {
    super();
  }

  render() {
    var incorrect = this.props.name !== this.props.namePredicted;
    var className = "team team-"+this.props.name;;
    var dataTeam = this.props.name;;
    var seed = this.props.seed;
    var displayName = this.props.displayName;
    var wrongName = "";

    if(this.props.name && !this.props.namePredicted) {}
    else if(!this.props.name && this.props.namePredicted) {
      className = "team team-"+this.props.namePredicted;
      dataTeam = this.props.namePredicted;
      seed = this.props.seedPredicted;
      displayName = this.props.displayNamePredicted;
    }
    else if(this.props.name === this.props.namePredicted) {}
    else {
      seed = this.props.seed;
      displayName = this.props.displayName;
      wrongName = this.props.displayNamePredicted;
    }

    console.log("team");
    return (
      <div
        className={className}
        data-team={dataTeam} >
        <span className="team-seed">
          {seed}
        </span>
        <span className="team-name">
          <div className="correct">
            {displayName}
          </div>
          <div className="incorrect">
            {wrongName}
          </div>
        </span>
      </div>
    );
  }
}
export default Team;
