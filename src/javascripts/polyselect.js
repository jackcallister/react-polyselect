/** @jsx React.DOM */
var React = require('react/addons');

var Polyselect = React.createClass({
  keyUp: function(event) {
    var code = event.keyCode;
    var highlightedIndex = this.state.highlightedIndex;
    var lastIndex = this.props.children.length;
    --lastIndex;

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
      if(this.refs.polyselect.getDOMNode().classList.contains("polyselect-inactive")) {
        this.setState({
          displayDropdown: true
        });
      } else {
        var selectedOption = this.refs["polyselect-option-" + highlightedIndex];
        selectedOption.setState({
          selected: !selectedOption.state.selected
        });
      }
    // Esc
    } else if (code == 27) {
      this.setState({
        displayDropdown: false
      }, function() {
        console.log(this.value());
      });
    }

    this.setState({
      highlightedIndex: highlightedIndex
    });
  },

  toggleDisplay: function() {
    this.setState({
      displayDropdown: !this.state.displayDropdown
    });
  },

  handleUncheck: function(index) {
    var polyoption = this.props.children[index];
    var values = this.state.values;
    var index = values.indexOf(polyoption.props.value);

    values.splice(index, 1);

    this.setState({
      values: values
    });
  },

  handleCheck: function(index) {
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
        state = this.state;
        handleCheck = this.handleCheck,
        handleUncheck = this.handleUncheck;

    // Loop through all the children (<polyoption>) in order
    // to add a ref and highlighted bool.
    var children = React.Children.map(this.props.children, function(child) {
      var highlighted = state.highlightedIndex === index;

      var options = React.addons.cloneWithProps(child, {
        highlighted: highlighted,
        ref: "polyselect-option-" + index,
        onCheck: handleCheck.bind(null, index),
        onUncheck: handleUncheck.bind(null, index)
      });

      index ++;

      return options;
    });

    return(
      <div className={"polyselect polyselect-" + displayClass} ref="polyselect" onKeyUp={this.keyUp} tabIndex="1">
        <input type="hidden" ref="value" value={this.state.values} />
        <div className="polyselect-select">
          <span onClick={this.toggleDisplay}>{this.props.prompt}</span>
          <div className="polyselect-dropdown">
            {children}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Polyselect;
