import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Search'
import ResultsDisplay from './ResultsDisplay'

class App extends Component {
  constructor() {
    super()
    this.state = {
      searchValue: '',
      searchResults: [],
      fetchInProgress: false
    }
  }

  updateSearch = (eventTargetValue) => {

    fetch(`http://gen.lib.rus.ec/search.php?req=${eventTargetValue}&phrase=1&view=simple&column=def&sort=title&sortmode=DESC`)
      .then((response) => response.text())
      .then((data) => {
        if (eventTargetValue === this.state.searchValue) {

          var parser = new DOMParser();

          // Parse the text
          var doc = parser.parseFromString(data, "text/html");
          let list = doc.querySelectorAll('[title = "Gen.lib.rus.ec"]')
          let list2 = doc.querySelectorAll('[href *= "book/index.php?md5="]')
          let listUpdated = []
          for (let i = 0; i < list.length; i++) {
            if (list[i].title === 'Gen.lib.rus.ec') {
              listUpdated.push((i + 1) + '. ' + list2[i].innerText + ': ' + list[i].getAttribute('href'))
            }
          }
          this.setState({
            searchResults: listUpdated,
            fetchInProgress: false
          })

        } // console.log((listUpdated))
      })
  }

  updateSearchHandler = (event) => {
    const eventTargetValue = event.target.value;
    this.setState({
      searchValue: event.target.value,
      fetchInProgress: true
    })
    this.updateSearch(eventTargetValue)
  }


  render() {
    return (
      <div className="App">
        
        <Search updateSearch={this.updateSearchHandler} />
        <ResultsDisplay fetchInProgress={this.state.fetchInProgress} results={this.state.searchResults} />
      </div>
    );
  }
}

export default App;
