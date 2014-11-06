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
      selected: false,
      highlighted: false
    };
  },

  propTypes: {
    selected: React.PropTypes.bool
  },

  render: function() {
    var highlightClass;

    if(this.props.highlighted) {
      highlightClass = "active";
    } else {
      highlightClass = "inactive";
    }

    return(
      <div className={"polyselect-option polyselect-option-" + highlightClass}>
        <input type="checkbox" checked={this.state.selected} onChange={this.toggle} value={this.props.value} />
        <span>{this.props.title}</span>
      </div>
    );
  }
});

module.exports = Polyoption;
