import logo from './logo.svg';
import './App.scss';
import React, {Component} from "react";

const padCharacters = ['Q','W','E','A','S','D','Z','X','C'];

const activeStyle = {
  backgroundColor: 'yellow'
};
const inactiveStyle = {
  backgroundColor: 'white'
};



const drumPadAttributes = [
  {
    keyCode: 81,
    character: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    character: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    character: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    character: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    character: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    character: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    character: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    character: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    character: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentPadCharacters: padCharacters,
      displayText: 'start'
    };
    this.updateDisplay = this.updateDisplay.bind(this);
  }
  updateDisplay(name){
    this.setState({displayText: name});
  }

  render() {
    return (
      <div id="drum-machine" className="innerContainer">
        <h1>Drum Machine</h1>
        <div id="display">{this.state.displayText}</div>
        <PadBank 
          currentPadCharacters={this.state.currentPadCharacters}
          updateDisplay={this.updateDisplay}
          />
      </div>
    );
  }
}

class PadBank extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    let padOutput = this.props.currentPadCharacters.map(
      (e, i, a) => {
        return (
          <DrumPad 
            character={drumPadAttributes[i].character} 
            id={drumPadAttributes[i].id}
            clipSrc={drumPadAttributes[i].url}
            keyCode={drumPadAttributes[i].keyCode}
            updateDisplay={this.props.updateDisplay}
            />
        );
      }
    );
    return(<div className='drum-container'>{padOutput}</div>);
  }
}

class DrumPad extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      padStyle: inactiveStyle
    };
    this.playSound = this.playSound.bind(this);
    this.toggleActivate = this.toggleActivate.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount(){
    document.addEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e){
    if(e.keyCode == this.props.keyCode){
      console.log(this.props.keyCode);
      this.playSound();
    }
  }
  toggleActivate(){
    if(this.state.padStyle === inactiveStyle){
      this.setState({padStyle: activeStyle});
      //console.log(">" + this.props.keyCode);
    }else if(this.state.padStyle == activeStyle){
      this.setState({padStyle: inactiveStyle});
    }
  }
  playSound(){
    //setTimeout(() => this.toggleActivate(), 500);
    console.log(this.props.character);
    this.toggleActivate();
    //play audio
    const sound = document.getElementById(this.props.character);
    this.props.updateDisplay(this.props.character);
    sound.play();
    setTimeout(() => this.toggleActivate(), 200);
  }

  render(){
    return (
      <div 
        className="drum-pad" 
        style={this.state.padStyle} 
        onClick={this.playSound}
        id={this.props.id}
        url={this}
        >
        <audio
          className="clip"
          id={this.props.character}
          src={this.props.clipSrc}
          />
        <p>{this.props.character}</p>
      </div>
    );
  }
}

//ReactDOM.render(<App />, document.getElementById('root'));

export default App;
