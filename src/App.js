import React, { Component } from "react";
import "./App.css";
import Product from "./components/product";

class App extends Component {
  state = {
    visible: true
  };

  render() {
    return (
      <div className="App">
        <Product />
      </div>
    );
  }
}

export default App;
