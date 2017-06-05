/**
 * Dashboard.jsx
 */

/*** @jsx React.DOM */

var Dashboard = React.createClass({

	getInitialState: function() {
		return {
			next: [],
			popular: [],
			recent: []
		};
	},

	getJSONData: function(callback) {

	}

	render: function() {
		return (
			<div>
				<Queue />
				<Spotify />
				<History />
				<Playbar />
			</div>
		)
	}
});

var Queue = React.createClass({

});

var Spotify = React.createClass({

});

var History = React.createClass({

});

var Playbar = React.createClass({ 

});


React.render(
	<Dashboard />,
	document.getElementById("maindiv")[0]
);