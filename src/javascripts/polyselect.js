/** @jsx React.DOM */
var React = require('react/addons');

var Polyselect = React.createClass({
  handleKeyUp: function(event) {
    var code = event.keyCode;
    var highlightedIndex = this.state.highlightedIndex;
    var lastIndex = this.props.children.length;
    --lastIndex;

    // Up - Move the highlighted option up
    // or to the bottom if on the first option
    if(code == 38) {
      --highlightedIndex;
      if(highlightedIndex < 0) {
        highlightedIndex = lastIndex;
      }
    // Down - Move the highlighted option down
    // or to the top if on the last option
    } else if (code == 40) {
      ++highlightedIndex;
      if(highlightedIndex > lastIndex) {
        highlightedIndex = 0;
      }
    // Enter - Activate the dropdown, if inactive. If active
    // set the highlighted option's state to selected
    } else if (code == 13) {
      if(this.refs["react-polyselect"].getDOMNode().classList.contains("polyselect-inactive")) {
        this.setState({
          displayDropdown: true
        });
      } else {
        var selectedOption = this.refs["polyselect-option-" + highlightedIndex];
        selectedOption.toggleCheck();
      }
    // Esc - Close the dropdown
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
    var displayClass;
    if (this.state.displayDropdown) {
      displayClass = "active";
    } else {
      displayClass = "inactive";
    }

    var index = 0,
        state = this.state,
        handleOptionUncheck = this.handleOptionUncheck,
        handleOptionCheck = this.handleOptionCheck;

    // Loop through all the children (<polyoption>)
    // to add ref and highlighted bool.
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

    var selectStyles = {
      display: "none !important"
    }

    return(
      <div className={"polyselect polyselect-" + displayClass} ref="react-polyselect" onKeyUp={this.handleKeyUp} tabIndex="1">
        <div className="polyselect-select" onClick={this.handleToggle}>{this.props.prompt}</div>
        <div className="polyselect-dropdown">
          {children}
        </div>
        <select ref="polyselect" multiple={true} value={this.state.values} style={selectStyles}></select>
      </div>
    );
  }
});

module.exports = Polyselect;
