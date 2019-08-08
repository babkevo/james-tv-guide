import React, { Component } from "react";
import API from "../../utils/API";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.scss";

const Tv = props => (
  <tr>
    <td>{props.tvList.programe}</td>
    <td>{props.tvList.programe_description}</td>
    <td>{props.tvList.programe_category}</td>
    <td>{props.tvList.startDate}</td>
    <td>{props.tvList.endDate}</td>

    <td>
      <Link to={"/tvlist/" + props.tvList._id}>View</Link>
    </td>

    <td>
      <Link to={"/tvlist/" + props.tvList._id}>Favourite</Link>
    </td>
  </tr>
);
class Home extends Component {
  state = {
    loggedIn: false,
    programes: []
  };
  onSubmit = this.onSubmit.bind(this);

  componentDidMount() {
    this.loggedIn();
    axios
      .get("/api/tvlist/alltv")
      .then(response => {
        this.setState({ programes: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  tvList() {
    return this.state.programes.map(function(currentTv, i) {
      return <Tv tvList={currentTv} key={i} />;
    });
  }

  loggedIn = () => {
    API.isLoggedIn()
      .then(user => {
        if (user.data.loggedIn) {
          this.setState({
            loggedIn: true
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      programe: this.state.programe,
      programe_description: this.state.programe_description,
      programe_category: this.state.programe_category
    };
    console.log(obj);
    axios
      .post("/api/tvlist/new" + this.props.match.params.id, obj)
      .then(res => console.log(res.data));

    this.props.history.push("/");
  }

  render() {
    return (
      <div className="homeBox">
        <h3>Program list</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>programe</th>
              <th>Description</th>
              <th>Category</th>
              <th>First aired</th>
              <th>Next airing</th>
              <th>^^^</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>{this.tvList()}</tbody>
        </table>
      </div>
    );
  }
}

export default Home;
