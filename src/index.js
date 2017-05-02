import React, { Component } from 'react';
import { render } from 'react-dom';
import Region from './components/region';

var teamColors = {
    "golden-state":"FDB927", "san-antonio":"#BAC3C9", "houston":"CE1141","la-clippers":"ED174C", "utah":"002B5C", "oklahoma-city":"007DC3"
}

var tournamentData = {
    "West": {
        "seeds": {
            1:"golden-state", 2:"san-antonio", 3:"houston", 4:"la-clippers", 5:"utah", 6:"oklahoma-city", 7:"memphis", 8:"portland"
        },
        "rounds": [
            [1,8,4,5,2,7,3,6], [1,5,2,3], [0,0]
        ]
    },
    "East": {
        "seeds": {
            1:"boston", 2:"cleveland", 3:"toronto", 4:"washington", 5:"atlanta", 6:"milwaukee", 7:"indiana", 8:"chicago"
        },
        "rounds": [
            [1,8,4,5,2,7,3,6], [1,4,2,3], [0,0]
        ]
    },
    "Final": {
        "seeds": {
            1:"boston", 2:"cleveland"
        },
        "rounds": [
            [0,0]
        ]
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            teamColors: teamColors,
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
        var that = this;
        var regions = this.state.regions.map((element, i) =>
            <Region
                state = {that.state}
                seeds = {tournamentData[element]["seeds"]}
                rounds = {tournamentData[element]["rounds"]}
                key = {i}
                type = {i%2 == 0 ? "left" : "right"}
                name = {element} />
        );

        return (
            <div className="tournament">
                <canvas id="canvas"></canvas>
                {regions}
            </div>
        );
    }
};

render(<App />, document.getElementById('app-root'));
