React Polyselect
================

This project is very early stage. There are lots of interactions to fine tune (keyboard and mouse inputs for example) and styling to do. Feel free to help out and suggestions are welcome! 

### Introduction

Native multiselects are quite difficult to use and offer poor usability. React Polyselect is an attempt create something user friendly and simply to use for developers. It combines a native style select and checkboxes which makes it feel very familiar. Take a look.

![img](http://i.imgur.com/bhxpA3Q.gif?1)

### Installation

If you're using npm you can run `npm install react-polyselect`. If you're in a non-node project check out the Installing for Rails section, that should point you in the right direction (even for other backend frameworks).

After installing (with npm) you need to pull the styles in or build your own. There's an overview of this for webpack, the same pattern applies for any other build tool. Another option for including styles is to simply copy and paste. If you plan on modifying the styles this is probably a good idea.

#### Styles for Webpack

After requiring `react-polyselect` you need to require the sass stylesheet directly from the node_modules directory like so. Make sure your path is relative. What this will do is insert those styles directly into the head.

```
var React = require('react'),
    ReactPolyselect = require('react-polyselect'),
    Polyselect = ReactPolyselect.Polyselect,
    Polyoption = ReactPolyselect.Polyoption;

require("!style!css!sass!./node_modules/react-polyselect/src/polyselect.scss");
```

You now need to configure webpack to load and process the sass file. Here's my typical setup.

```
loaders: [
  { test: /\.scss$/, loader: "style-loader!sass-loader" }
]
```
If you are using less I'm sorry! But fear not I plan on including a less stylesheet soon (better yet set it up yourself and submit a PR).

### Usage

The `Polyselect`'s markup matches the native select spec (other than the multiselect attribute) as does the `Polyoption` for options. Here's an example.

```
<Polyselect name="example">
  <Polyoption name="opt-1" title="My select option" value="1" />
  <Polyoption name="opt-2" title="My second select option" value="2" />
  <Polyoption name="opt-3" title="My third select option" value="3" />
</Polyselect>
```
Extracting the value on form submission is simple. If you are using React you can access the value via the polyselect ref `this.ref.polyselect`. If you are using this component as part of a Rails form the name prop used on a hidden select. Just name it correctly to send it as normal params.

### Questios/help

If you are struggling feel free to make an issue and I'll do my best to help you. Or if you'd rather be less public (possibly to abuse me) fire an email off to jarsbe@gmail.com. Have a nice day.
