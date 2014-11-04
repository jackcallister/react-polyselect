/** @jsx React.DOM */

var React = require('react');

var Polyoption = React.createClass({
  toggle: function(index) {
    this.setState({
      selected: !this.state.selected
    });
  },

  getInitialState: function() {
    return {
      selected: this.props.selected
    }
  },

  getDefaultProps: function() {
    return {
      selected: false
    };
  },

  propTypes: {
    selected: React.PropTypes.bool
  },

  render: function() {
    return(
      <div>
        <input type="checkbox" checked={this.state.selected} onChange={this.toggle} value={this.props.value} />
        <span>{this.props.title}</span>
      </div>
    );
  }
});

module.exports = Polyoption;
