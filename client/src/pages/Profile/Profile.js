import React, { Component } from "react";
import "./Profile.scss";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import API from "../../utils/API";

class Profile extends Component {
  state = {
    loggedIn: false,
    user: null,
    loading: true,
    channels: [
      {
        url: "/all",
        name: "All"
      },
      {
        url: "/bbc",
        name: "BBC"
      },
      {
        url: "/dr2",
        name: "DR2"
      },
      {
        url: "/tv2",
        name: "TV2"
      },
      {
        url: "/cnn",
        name: "CNN"
      }
    ]
  };

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
  ChannelList() {
    let mk = this.state.currentcateg;
    return this.state.channels.map(function(channel, i) {
      return (
        <Link
          to={"/api/tvlist/alltv" + mk + channel.url}
          key={i}
          className="list-group-item list-group-item-action"
        >
          {channel.name}
        </Link>
      );
    });
  }

  render() {
    return (
      <div className="profilePage">
        {this.state.loggedIn ? (
          <div className="profileBox">
            <h1 id="userTitle">Welcome {this.state.user.username}</h1>
          </div>
        ) : (
          <div className="noUser">
            {!this.state.loading ? (
              <>
                <h1>please log in</h1>
                <Link className="loginLink" to="/login">
                  <Button className="loginBtn" color="info" block>
                    Login
                  </Button>
                </Link>
              </>
            ) : (
              <img
                id="loadingIcon"
                src="./assets/images/loading.gif"
                alt="loading"
              />
            )}
          </div>
        )}
        <div className="favorite">
          <hr />
          <h3>Channels</h3>
          <div className="list-group">{this.ChannelList()}</div>
        </div>
      </div>
    );
  }
}

export default Profile;
