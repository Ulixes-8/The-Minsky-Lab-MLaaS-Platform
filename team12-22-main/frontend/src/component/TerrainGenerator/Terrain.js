import React from "react";
import "./style.css";
//import p5 from "./p5.min.js";
import p5 from "p5";
import sketch from "./sketch";


class Terrain extends React.Component {
  componentDidMount() {
    new p5(sketch, "terrain-container");
  }

  render() {
    return (
      <div id="terrain-container">
      </div>
    );
  }
}

export default Terrain;

