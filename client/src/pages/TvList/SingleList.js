import React, { Component } from "react";
import "./TvList.scss";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../../utils/API";

class SingleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programe: "",
      programe_description: "",
      programe_category: "",
      currentPrograme: {}
    };
    this.onchangeprograme = this.onchangeprograme.bind(this);
    this.onchangeprograme_description = this.onchangeprograme_description.bind(this);
    this.onchangeprograme_category = this.onchangeprograme_category.bind(this);
  }
  onchangeprograme(e) {
    this.setState({
      programe: e.target.value
    });
  }
  onchangeprograme_category(e) {
    this.setState({
      programe_category: e.target.value
    });
  }
  onchangeprograme_description(e) {
    this.setState({
      programe_description: e.target.value
    });
  }
  componentDidMount() {
    axios
      .get("/api/tvlist/alltv/")
      .then(response => {
        this.setState({
          currentPrograme: response.data.find(
            elm => elm._id === this.props.match.params.id
          )
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
        
      <div className="card">
        <div className="card-header">
          <strong>{this.state.currentPrograme.programe}</strong>
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{this.state.currentPrograme.programe_description}</p>
            <footer className="blockquote-footer">
              {this.state.currentPrograme.programe_category}
            </footer>
          </blockquote>
        </div>
      </div>
    );
  }
}

export default SingleList;
