import React, { Component } from "react";
import { Button } from "reactstrap";
import API from "../../utils/API";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./Home.scss";

const Tv = props => (
  <tr>
    <td>{props.tvList.programe}</td>
    <td>{props.tvList.programe_description}</td>
    <td>{props.tvList.programe_category}</td>

    <td>
      <Link to={"/tvlist/" + props.tvList._id}>View</Link>
    </td>
    
  </tr>
);
class Home extends Component {
  state = {
    loggedIn: false,
    programes: []
  };

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
              <th>^^^</th>
             
            </tr>
          </thead>
          <tbody>{this.tvList()}</tbody>

        </table>
      </div>
    );
  }
}

export default Home;
