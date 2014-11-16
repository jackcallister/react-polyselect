/** @jsx React.DOM */

var React = require('react/addons');

var Polyselect = React.createClass({
  handleKeyUp: function(event) {
    var code = event.keyCode;
    var highlightedIndex = this.state.highlightedIndex;
    var lastIndex = this.props.children.length - 1;

    // Up
    if(code == 38) {
      --highlightedIndex;
      if(highlightedIndex < 0) {
        highlightedIndex = lastIndex;
      }
    // Down
    } else if (code == 40) {
      ++highlightedIndex;
      if(highlightedIndex > lastIndex) {
        highlightedIndex = 0;
      }
    // Enter
    } else if (code == 13) {
      if(!this.state.displayDropdown) {
        this.setState({
          displayDropdown: true
        });
      } else {
        var selectedOption = this.refs["polyselect-option-" + highlightedIndex];
        selectedOption.toggleCheck();
      }
    // Esc
    } else if (code == 27) {
      highlightedIndex = -1;
      this.setState({
        displayDropdown: false
      });
    }

    this.setState({
      highlightedIndex: highlightedIndex
    });
  },

  handleToggle: function() {
    this.setState({
      displayDropdown: !this.state.displayDropdown
    });
  },

  handleOptionUncheck: function(index) {
    var polyoption = this.props.children[index];
    var values = this.state.values;
    var index = values.indexOf(polyoption.props.value);

    values.splice(index, 1);

    this.setState({
      values: values
    });
  },

  handleOptionCheck: function(index) {
    var polyoption = this.props.children[index];
    var values = this.state.values;

    values.push(polyoption.props.value);

    this.setState({
      values: values
    });
  },

  getInitialState: function() {
    return {
      displayDropdown: false,
      highlightedIndex: -1,
      values: []
    }
  },

  getDefaultProps: function() {
    return {
      prompt: "Please select"
    };
  },

  render: function() {
    var displayClass = this.state.displayDropdown ? "active" : "inactive";

    var index = 0,
        state = this.state,
        handleOptionUncheck = this.handleOptionUncheck,
        handleOptionCheck = this.handleOptionCheck;

    // Loop through all the children (<polyoption>)
    // to add ref, highlighted bool and toggle callbacks.
    var children = React.Children.map(this.props.children, function(child) {
      var highlighted = state.highlightedIndex === index;

      var options = React.addons.cloneWithProps(child, {
        highlighted: highlighted,
        ref: "polyselect-option-" + index,
        onOptionUncheck: handleOptionUncheck.bind(null, index),
        onOptionCheck: handleOptionCheck.bind(null, index)
      });

      index ++;

      return options;
    });

    var nativeChildren = React.Children.map(this.props.children, function(child) {
      return (
        <option name={child.props.name} value={child.props.value} />
      );
    });

    var nativeSelectStyles = {
      display: "none !important"
    }

    return(
      <div className={"polyselect polyselect-" + displayClass} ref="react-polyselect" onKeyUp={this.handleKeyUp} tabIndex="1">
        <div className="polyselect-select" onClick={this.handleToggle}>{this.props.prompt}</div>
        <div className="polyselect-dropdown">
          {children}
        </div>
        <select ref="polyselect" multiple={true} value={this.state.values} style={nativeSelectStyles} name={this.props.name}>
          {nativeChildren}
        </select>
      </div>
    );
  }
});

module.exports = Polyselect;
