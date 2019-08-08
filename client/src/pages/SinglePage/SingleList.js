import React, { Component } from "react";
import "./SinglePage.scss";
import axios from "axios";

class SingleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programe: "",
      programe_description: "",
      programe_category: "",
      startDate: new Date(),
      endDate: new Date(),
      currentPrograme: {},
    };
    this.onchangeprograme = this.onchangeprograme.bind(this);
    this.onchangeprograme_description = this.onchangeprograme_description.bind(this);
    this.onchangeprograme_category = this.onchangeprograme_category.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);

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
  handleChangeStart(date) {
    this.setState({ startDate: date });
  }

  handleChangeEnd(date) {
    this.setState({ endDate: date });
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
        <hr></hr>
        <div className= "card-body">
          <p>	First aired</p>
        {this.state.currentPrograme.startDate}
        </div>
        <hr></hr>
        <div className= "card-body">
        <p>Next airing</p>
        {this.state.currentPrograme.startDate}
        </div>
      </div>
    );
  }
}

export default SingleList;
