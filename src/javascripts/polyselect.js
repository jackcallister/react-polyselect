/** @jsx React.DOM */
var React = require('react/addons');

var SearchBar = React.createClass({
  onTypeahead: function(event) {
    this.props.typeaheadHandler(event.target.value)
  },

  render: function() {
    return(
      <input type="text" onChange={this.onTypeahead} />
    );
  }
});

var Polyselect = React.createClass({
  keyUp: function(event) {
    var code = event.keyCode;
    var highlightedIndex = this.state.highlightedIndex;
    var lastIndex = this.state.matchingOptions.length;

    --lastIndex;

    if(code == 38) {
      --highlightedIndex;
      if(highlightedIndex < 0) {
        highlightedIndex = lastIndex;
      }
    } else if (code == 40) {
      ++highlightedIndex;
      if(highlightedIndex > lastIndex) {
        highlightedIndex = 0;
      }
    } else if (code == 13) {
      selectedOption = this.refs["polyselect-option-" + highlightedIndex];
      selectedOption.setState({
        selected: !selectedOption.state.selected
      });
    } else if (code == 27) {
      this.setState({
        displayDropdown: false
      })
    }

    this.setState({
      highlightedIndex: highlightedIndex
    });
  },

  toggleDisplay: function() {
    this.setState({
      displayDropdown: !this.state.displayDropdown
    }, function(){
      if (this.props.search) {
        this.refs.searchBar.getDOMNode().focus();
      }
    });
  },

  searchMatch: function(query, element) {
    return new RegExp(query, 'i').test(element.props.title);
  },

  typeaheadHandler: function(query) {
    matchingOptions = this.state.options.filter(this.searchMatch.bind(this, query));
    this.setState({
      matchingOptions: matchingOptions
    });
  },

  getInitialState: function() {
    return {
      options: this.props.children,
      matchingOptions: this.props.children,
      displayDropdown: false,
      highlightedIndex: -1
    }
  },

  getDefaultProps: function() {
    return {
      search: true,
      prompt: "Please select"
    };
  },

  propTypes: {
    search: React.PropTypes.bool
  },

  render: function() {
    var searchBar;

    if (this.props.search) {
      searchBar = <SearchBar typeaheadHandler={this.typeaheadHandler} ref="searchBar" />
    }

    var displayClass;

    if (this.state.displayDropdown) {
      displayClass = "active";
    } else {
      displayClass = "inactive";
    }

    var index = 0,
        state = this.state;

    var children = React.Children.map(this.state.matchingOptions, function(child) {
      var highlighted = state.highlightedIndex === index;

      matchingOptions = React.addons.cloneWithProps(child, {
        highlighted: highlighted,
        ref: "polyselect-option-" + index
      });

      index ++;

      return matchingOptions;
    });

    return(
      <div className={"polyselect polyselect-" + displayClass}>
        <div className="polyselect-select" onKeyUp={this.keyUp}>
          <span onClick={this.toggleDisplay}>{this.props.prompt}</span>
          <div className="polyselect-dropdown">
            {searchBar}
            {children}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Polyselect;
