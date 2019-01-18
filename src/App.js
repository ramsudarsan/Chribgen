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
      fetchInProgress: false,
      currentPage: 0,
      hasMore: false,
      hasPrevious: false
    }
  }

  updateSearch = (eventTargetValue, pageNumber) => {
  
    fetch(`http://gen.lib.rus.ec/search.php?req=${eventTargetValue}&phrase=1&view=simple&column=def&sort=title&sortmode=DESC&page=${pageNumber}`)
      .then((response) => response.text())
      .then((data) => {
        if (eventTargetValue === this.state.searchValue) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(data, "text/html");
          //console.log(doc);

          let downloadList = doc.querySelectorAll('[title = "Gen.lib.rus.ec"]')
          let titleList = doc.querySelectorAll('[href *= "book/index.php?md5="]')
          let tableDataList = doc.querySelectorAll('td')
          let authorsList = []

          for (let i = 0; i < tableDataList.length; i++) {

            let anchorTagList = tableDataList[i].getElementsByTagName('a')
            let authorHrefList = []
            for (let i = 0; i < anchorTagList.length; i++) {
              if (anchorTagList[i].getAttribute('href').includes('column=author') || anchorTagList[i].getAttribute('href').includes('column[]=author')) {
                authorHrefList.push(anchorTagList[i])
              }
            }
            if (authorHrefList.length > 0) {
              authorsList.push(authorHrefList)
            }
          }

          let listUpdated = []
          for (let i = 0; i < downloadList.length; i++) {
            let authors = ''
            let listNumber = (i + 1)
            let title = titleList[i].innerText
            let genliblink = downloadList[i].getAttribute('href')
            for (let j = 0; j < authorsList[i].length; j++) {
              if (j === (authorsList[i].length - 1)) {
                authors += authorsList[i][j].innerText
              } else {
                authors += authorsList[i][j].innerText + ', '
              }
            }
            
            let itemArray = [listNumber, title, authors, genliblink]
            listUpdated.push(itemArray)
          }

          let nextPageList = doc.querySelectorAll('[href *= "&page="]')
          let hasNext = false;
          let hasPrevious = false;
          for (let i = 0; i < nextPageList.length; i++){
            console.log(nextPageList[i].getAttribute('href'))
            if (nextPageList[i].getAttribute('href').includes("&page=" + (pageNumber+1))) {
              hasNext = true
            }
            if (nextPageList[i].getAttribute('href').includes("&page=" + (pageNumber-1))) {
              hasPrevious = true
            }
          }

          this.setState({
            searchResults: listUpdated,
            fetchInProgress: false,
            hasMore: hasNext,
            hasPrevious: hasPrevious,
            currentPage: pageNumber
          })

        } 
      })
  }

  updateSearchHandler = (event) => {
    const eventTargetValue = event.target.value;
    this.setState({
      searchValue: event.target.value,
      fetchInProgress: true,
    })
    this.updateSearch(eventTargetValue, 1)
  }

  getNextResults = () => {
    const eventTargetValue = this.state.searchValue;
    this.setState({
      fetchInProgress: true,
    })
    this.updateSearch(eventTargetValue, this.state.currentPage+1)
  }

  getPreviousResults = () => {
    const eventTargetValue = this.state.searchValue;
    this.setState({
      fetchInProgress: true,
    })
    this.updateSearch(eventTargetValue, this.state.currentPage-1)
  }

  render() {
    return (
      <div className="App">

        <Search updateSearch={this.updateSearchHandler} />
        <ResultsDisplay fetchInProgress={this.state.fetchInProgress} results={this.state.searchResults} hasMore={this.state.hasMore} hasPrevious={this.state.hasPrevious} nextResults={this.getNextResults} previousResults={this.getPreviousResults}/>
      </div>
    );
  }
}

export default App;
