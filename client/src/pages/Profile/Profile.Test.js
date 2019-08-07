import React, { Component } from "react";
import renderer from 'react-test-renderer';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

test('Link to Profile test', () => {
    const component = renderer.create(
    <Router>  <Link to="localhost:3000/tvlist/alltv">All Program list </Link> </Router> 
    );

    let testcategories = component.toJSON();
    expect(testcategories).toMatchSnapshot();
  


});