/** @jsx React.DOM */

var React = require('react'),
    ReactPolyselect = require('../src/javascripts/main'),
    Polyselect = ReactPolyselect.Polyselect,
    Polyoption = ReactPolyselect.Polyoption;

var App = React.createClass({

  submit: function() {
    alert("You selected the following values: "  + this.refs.polyselect.refs.polyselect.props.value)
  },

  render: function() {
    return (
      <Polyselect ref="polyselect" name="jack">
        <Polyoption title="My select option" value="1" />
        <Polyoption title="My second select option" value="2" />
        <Polyoption title="My third select option" value="3" />
      </Polyselect>
    );
  }
});

React.render(<App/>, document.body);
