import React, { Component } from "react";
import "./TvList.scss";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../../utils/API";

class TvList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programe: "",
      loggedIn: false,
      user: null,
      loading: true,
      programe_description: "",
      programe_category: ""
    };

    this.onchangeprograme = this.onchangeprograme.bind(this);
    this.onchangeprograme_description = this.onchangeprograme_description.bind(this);
    this.onchangeprograme_category = this.onchangeprograme_category.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.loading();

    API.isLoggedIn()
      .then(user => {
        if (user.data.loggedIn) {
          this.setState({
            loggedIn: true,
            user: user.data.user
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    console.log(this.props);
  }

  loading() {
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1000);
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
  onSubmit(e) {
    e.preventDefault();
    console.log(`Form submitted:`);
    console.log(`Tv programe: ${this.state.programe}`);

    const newTvList = {
      programe: this.state.programe,
      programe_category: this.state.programe_category,
      programe_description: this.state.programe_description
    };

    axios
      .post("http://localhost:3000/api/tvlist/add", newTvList)
      .then(res => console.log(res.data));

    this.setState({
      programe: "",
      programe_category: "",
      programe_description: ""
    });
  }
  render() {
    return (
      <div className="tvbox">
        <div className="tvboxlist">
          <h1 id="userList" />
        </div>
        <div style={{ marginTop: 10 }}>
          <h3>Create New Tv List</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Programe Name: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.programe}
                onChange={this.onchangeprograme}
              />
            </div>

            <div className="form-group">
              <label>Description: </label>
              <textarea
                type="textarea"
                className="form-control"
                value={this.state.programe_description}
                onChange={this.onchangeprograme_description}
              />
            </div>
            <br />
            <label>Choose Channel:</label>
            <br />
            <div className="form-group">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="categoryOptions"
                  id="categoryBBC"
                  value="BBC"
                  checked={this.state.programe_category === "BBC"}
                  onChange={this.onchangeprograme_category}
                />
                <label className="form-check-label">BBC</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="categoryOptions"
                  id="categoryDR2"
                  value="DR2"
                  checked={this.state.programe_category === "DR2"}
                  onChange={this.onchangeprograme_category}
                />
                <label className="form-check-label">DR2</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="categoryOptions"
                  id="categoryTV2"
                  value="TV2"
                  checked={this.state.programe_category === "TV2"}
                  onChange={this.onchangeprograme_category}
                />
                <label className="form-check-label">TV2</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="categoryOptions"
                  id="categoryDRRamasjang"
                  value="DRRamasjang"
                  checked={this.state.programe_category === "DRRamasjang"}
                  onChange={this.onchangeprograme_category}
                />
                <label className="form-check-label">DR Ramasjang</label>
              </div>
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Create TvList"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TvList;
