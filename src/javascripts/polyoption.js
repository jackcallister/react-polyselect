/** @jsx React.DOM */

var React = require('react');

var Polyoption = React.createClass({
  toggle: function() {
    this.setState({
      selected: !this.state.selected
    }, function() {
      if (this.state.selected) {
        this.props.onCheck();
      } else {
        this.props.onUncheck();
      }
    });
  },

  getInitialState: function() {
    return {
      selected: false
    }
  },

  render: function() {
    var highlightClass;
    if (this.props.highlighted) {
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
