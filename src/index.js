import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lat: null, errorMessage: null, longitude: null };
  }
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        //we called setstate
        this.setState({
          lat: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log(position.coords.latitude);
      },
      (err) => {
        this.setState({ errorMessage: err.message });
      }
    );
  }
  render() {
    // console.log(this.state.lat);
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage} </div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} long={this.state.longitude} />;
    }
    return <Spinner message="Please accept location request " />;
  }
}
ReactDOM.render(<App />, document.querySelector("#root"));
