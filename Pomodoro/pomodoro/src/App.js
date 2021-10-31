import './App.css';
import React from 'react';
import LengthSetter from './Components/LengthSetter.js';
import Timer from './Components/Timer.js'
class App extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      setIntervalID: null
    };

    this.incSessionLength = this.incSessionLength.bind(this);
    this.decSessionLength = this.decSessionLength.bind(this);
    this.incBreakLength = this.incBreakLength.bind(this);
    this.decBreakLength = this.decBreakLength.bind(this);
  }

  incSessionLength(){
    this.setState(
      (prevState) => {return {sessionLength: (prevState.sessionLength < 59) ? (prevState.sessionLength + 1) : prevState.sessionLength}}
    ); 
  }

  decSessionLength(){
    //need validation
    this.setState(
      (prevState) => {return {sessionLength: (prevState.sessionLength > 0) ? (prevState.sessionLength - 1) : prevState.sessionLength}}
    ); 

  }

  incBreakLength(){
    this.setState(
      (prevState) => {return {breakLength: (prevState.breakLength < 59) ? (prevState.breakLength + 1) : prevState.breakLength}}
    ); 
  }

  decBreakLength(){
    //need validation
    this.setState(
      (prevState) => {return {breakLength: (prevState.breakLength > 0) ? (prevState.breakLength - 1) : prevState.breakLength}}
    ); 
  }

  render(){
    return (
      <div className="App">
        <LengthSetter title="Session Length"
                      length={this.state.sessionLength}
                      plus={this.incSessionLength}
                      minus={this.decSessionLength}
                      />
        <LengthSetter title="Break Length"
                      length={this.state.breakLength}
                      plus={this.incBreakLength}
                      minus={this.decBreakLength}
                      />
        <Timer minutes={this.state.sessionLength} seconds={this.state.breakLength}/>
      </div>
    );
  }
  
}

export default App;
