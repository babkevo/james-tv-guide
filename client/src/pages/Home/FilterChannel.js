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

    <td>
      <Link to={"/tvlist/" + props.tvList._id}>View</Link>
    </td>
  </tr>
);
class FilterChannel extends Component {
  state = {
    loggedIn: false,
    programes: []
  };

  componentDidMount() {
    let area = this.props.match.params.area;
    let category = this.props.match.params.categ;
    switch (area) {
        case "movies":
            area = "Movies";
            break;
        case "news":
            area = "News";
            break;
        case "sports":
            area = "Sports";
            break;
        case "horror":
            area = "Horror";
            break;
        case "documentary":
            area = "Documentary";
            break;
        default :
            area = "Movies";
    }
    switch (category) {
        case "bbc":
            category = "BBC";
            break;
        case "dr2":
            category = "DR2";
            break;
        case "dr1":
            category = "DR1";
            break;
        case "cnn":
            category = "CNN";
            break;
        default :
            category = "Movies";
    }
    this.loggedIn();
    axios
      .get("/api/tvlist/filteredTv", {
        params: {
            area : area,
            categ : category
        }
      })
      .then(response => {
        if (response.data && response.data.length > 0) {
            this.setState({Jobs: response.data});
        }
        else {
            this.setState({Nojobs: "No available programes"});
        }
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

export default FilterChannel;
