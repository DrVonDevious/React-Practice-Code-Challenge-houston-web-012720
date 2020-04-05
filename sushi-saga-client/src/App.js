import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  constructor() {
    super()
    this.state ={
      sushis: [],
      sushiIndex: 0,
      budget: 100,
      eaten: []
    }
  }

  fetchSushi = () => {
    fetch(API)
      .then(res => res.json())
      .then(sushis => {
        this.setState({sushis: sushis})
      })
  }

  patchSushi = (sushi) => {
    fetch(API + `/${sushi.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eaten: true
      })
    })
  }

  cookShushi = () => {
    this.state.sushis.forEach(sushi => {
      fetch(API + `/${sushi.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eaten: false
        })
      })
    })
  }

  componentDidMount() {
    this.fetchSushi()
  }

  componentDidUpdate() {
    this.cookShushi()
  }

  handleMoreSushi = () => {
    console.log("MORE SUSHI!!!")
    this.state.sushiIndex >= 96
      ? this.setState({sushiIndex: 0})
      : this.setState({sushiIndex: this.state.sushiIndex + 4})
  }

  handleEatSushi = (sushi) => {
    if (this.state.budget >= sushi.price) {
      this.patchSushi(sushi)
      this.setState({eaten: [...this.state.eaten, sushi]})
      this.setState({budget: this.state.budget - sushi.price})
    } else {
      console.log("You broke bitch!")
    }
  }

  render() {
    return (
      <div className="app">
        <SushiContainer sushis={this.state.sushis.slice(this.state.sushiIndex,
                                                        this.state.sushiIndex+4)}
                        eaten={this.state.eaten}
                        onMoreSushi={this.handleMoreSushi}
                        onEatSushi={(sushi) => this.handleEatSushi(sushi)} />
        <Table budget={this.state.budget}/>
      </div>
    );
  }
}

export default App;
