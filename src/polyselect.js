/** @jsx React.DOM */

var React = require('react');

var SearchBar = React.createClass({
  onTypeahead: function(event) {
    this.props.typeaheadHandler(event.target.value)
  },

  render: function() {
    return(
      <input type="text" placeholder="Search" onChange={this.onTypeahead} />
    );
  }
});

var Polyselect = React.createClass({
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
      matchingOptions: this.props.children
    }
  },

  getDefaultProps: function() {
    return {
      search: true
    };
  },

  propTypes: {
    search: React.PropTypes.bool
  },

  render: function() {
    var searchbar;

    if (this.props.search) {
      searchbar = <SearchBar typeaheadHandler={this.typeaheadHandler} ref="searchbar" />
    }

    return(
      <div>
        {searchbar}
        {this.state.matchingOptions}
      </div>
    );
  }
});

module.exports = Polyselect;
