import React from 'react';

class Timer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            minutes: this.props.sessionLength,
            seconds: 0,
            countDownID: null,
            countingDown: false,
            currentSession: 'Session',
            sessionCount: 4
        };

        this.reset = this.reset.bind(this);
        this.decMinutes = this.decMinutes.bind(this); //debug n test
        this.cancelCountdown = this.cancelCountdown.bind(this);
        this.toggleCountDown = this.toggleCountDown.bind(this);
        this.countDown = this.countDown.bind(this);
        this.startNextBlock = this.startNextBlock.bind(this);
    }

    reset(){
        //reset works
        clearInterval(this.state.countDownID);
        this.setState(
            {
                minutes: this.props.sessionLength,
                seconds: 0,
                countDownID: null,
                countingDown: false,
                sessionCount: 4
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
                let countDownID = setInterval(this.countDown, 50);
                this.setState({countDownID: countDownID}); 
            }
        }
    }

    countDown(){
        console.log("countDown()");
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
            //out of time then go to next session. defer to some session manager.
            //stop countdown and start next session
            this.cancelCountdown();
            this.startNextBlock();
            console.log('cancelCountdown() and startNextBlock()');
        }
    }

    startNextBlock(){
        console.log("inside startNextBlock()");
        //if currentSession is a Session (not break), then set session to break and change minutes
        //if currentSession is a Break, then decrement session count and see if theres more session left
        //if there is then update the minutes, session to Session and start countDown()
        if(this.state.currentSession === 'Session'){
            this.setState(
                {
                    currentSession: "Break",
                    minutes: this.props.breakLength
                }
            );
            console.log('ONE');
            this.toggleCountDown();
        }else if(this.state.currentSession === "Break"){
            console.log('TWO');
            this.setState(
                (prevState) => {
                    return {sessionCount: prevState.sessionCount - 1}
                }
            );
            if(this.state.sessionCount > 0){
                this.setState(
                    {
                        currentSession: "Session",
                        minutes: this.props.sessionLength
                    }
                );
                this.toggleCountDown();
            }else{
                //done with all sessions
                console.log('THREE');
            }
        }
    }

    render(){

        var minutes = (this.state.minutes < 10) ? "0" + this.state.minutes : this.state.minutes;
        var seconds = (this.state.seconds < 10) ? "0" + this.state.seconds : 
                                    (this.state.seconds === 60 ? "00" : this.state.seconds);
        
        return(
            <div className="Timer">
                <h3>{this.state.currentSession} ({this.state.sessionCount})</h3>
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