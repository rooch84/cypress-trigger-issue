import React from "react";
import { render } from "react-dom";
import Draggable from "react-draggable";

import "./style.css";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Draggable handle=".header" grid={[5, 5]}>
          <div className="outer">
            <div className="header">Click here to move me</div>
            <div className="main" />
          </div>
        </Draggable>
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));
