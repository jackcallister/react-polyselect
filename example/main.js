/** @jsx React.DOM */

var React = require('react'),
    ReactPolyselect = require('../src/main'),
    Polyselect = ReactPolyselect.Polyselect,
    Polyoption = ReactPolyselect.Polyoption;

var App = React.createClass({

  render: function() {
    return (
      <Polyselect>
        <Polyoption title="My select option" value="1" selected="true" />
        <Polyoption title="My second select option" value="2" />
        <Polyoption title="My third select option" value="3" />
      </Polyselect>
    );
  }
});

React.render(<App/>, document.body);
