import React from 'react';

class Timer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            minutes: this.props.minutes,
            seconds: 0,
            countDownID: null,
            countingDown: false
        };

        this.reset = this.reset.bind(this);
        this.decMinutes = this.decMinutes.bind(this); //debug n test
        this.cancelCountdown = this.cancelCountdown.bind(this);
        this.toggleCountDown = this.toggleCountDown.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    reset(){
        //reset works
        clearInterval(this.state.countDownID);
        this.setState(
            {
                minutes: this.props.minutes,
                seconds: 0,
                countDownID: null,
                countingDown: false
            }
        );
    }

    //test and debug
    decMinutes(){
        if(this.state.minutes > 0){
            this.setState(
                (prevState) => {return {minutes: prevState.minutes - 1 }}
            );
        }else{
            clearInterval(this.state.countDownID);
            this.setState({countDownID: null});
        }
        
    }

    decSeconds(){
        if(this.state.seconds > 0){
            this.setState(
                (prevState) => {return {minutes: prevState.seconds - 1 }}
            );
        }
    }
    
    cancelCountdown(){
        clearInterval(this.state.countDownID);
        this.setState({
            countDownID: null,
            countingDown: false
        });
    }

    toggleCountDown(){

        if(this.state.countingDown){
            this.setState({countingDown: false});
            this.cancelCountdown();
        }else{
            this.setState({countingDown: true});
            if(this.state.minutes > 0 || this.state.seconds > 0){
                //decrement by seconds if theres time on the clock
                //decrement one second every 1000ms
                //test and debug first with decMinutes()
                let countDownID = setInterval(this.countDown, 1000);
                this.setState({countDownID: countDownID}); 
            }
        }
    }

    countDown(){
        //if theres seconds on the clock, countdown seconds
        if(this.state.seconds > 0){
            this.setState((prevState) => {return {seconds: prevState.seconds - 1}});
        }else if(this.state.minutes > 0){
            //decrement minutes and add 60 seconds to seconds
            this.setState(
                (prevState) => {
                    return {
                        minutes: prevState.minutes - 1,
                        seconds: 59
                        //we lose one second setting it to 59 not 60
                    }
                }
            );
        }else{
            this.cancelCountdown();
        }
    }

    render(){

        var minutes = (this.state.minutes < 10) ? "0" + this.state.minutes : this.state.minutes;
        var seconds = (this.state.seconds < 10) ? "0" + this.state.seconds : 
                                    (this.state.seconds == 60 ? "00" : this.state.seconds);
        
        return(
            <div className="Timer">
                <div className="lengthDisplay">{minutes}:{seconds}</div>
                <button onClick={this.toggleCountDown}>Start/Stop</button>
                <button onClick={this.reset}>Reset</button>
                <h3>{this.state.countDownID}</h3>
                <button onClick={this.cancelCountdown}>Cancel</button>
            </div>
        );
    }
}

export default Timer;