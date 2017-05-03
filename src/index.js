import React, { Component } from 'react';
import { render } from 'react-dom';
import Region from './components/region';
var tournamentData = require('json-loader!./data/playoffs2017.json');
var brackets = require('json-loader!./data/brackets2017.json');

class App extends Component {
  constructor() {
    super();
    this.state = {
      regions: this.getRegions()
    };
  }

  getRegions() {
    var response = [];
    for(var key in tournamentData) {
      response.push(key);
    }
    return response;
  }

  render() {
    console.log(tournamentData);
    console.log(brackets);


    var that = this;
    var regions = this.state.regions.map((element, i) =>
      <Region
        seeds = {tournamentData[element]["seeds"]}
        rounds = {tournamentData[element]["rounds"]}
        games = {tournamentData[element]["games"]}
        userData = {brackets["rohan"][element]}
        type = {i%2 == 0 ? "left" : "right"}
        name = {element}
        key = {i} />
    );

    console.log("app");

    return (
      <div className="tournament">
        <canvas id="canvas"></canvas>
        {regions}
      </div>
    );
  }
};
render(<App />, document.getElementById('app-root'));
