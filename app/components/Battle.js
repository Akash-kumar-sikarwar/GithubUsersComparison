import React from 'react';
import { render } from 'react-dom';
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Results from './Results';
import { ThemeConsumer } from '../contexts/theme';

function Instructions(){
    return (
        <ThemeConsumer>
            {
                ({theme})=> (
                    <div className="instructions-container">
                        <h1 className="center-text header-lg">
                            Instructions
                        </h1>
                        <ol className="container-sm grid center-text battle-instructions">
                            <li>
                                <h3 className="header-sm">Enter two github users</h3>
                                <FaUserFriends className={`bg-${theme}`} color="rgb(255, 191, 116)" size={140} />
                            </li>
                            <li>
                                <h3 className="header-sm">Battle</h3>
                                <FaFighterJet className={`bg-${theme}`} color="#727272" size={140} />
                            </li>
                            <li>
                                <h3 className="header-sm">See the winner</h3>
                                <FaTrophy className={`bg-${theme}`} color="rgb(255, 215, 0)" size={140} />
                            </li>
                        </ol>
                    </div>
               )
            }
        </ThemeConsumer>
    );
}

class PlayerInput extends React.Component{
    constructor(){
        super();
        this.state = {
            username:'',
            playerTwo:''
        }
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.onSubmit(this.state.username);
    }

    handleChange(e){
        this.setState({
            username: e.target.value
        })
    }

    render(){

        return(

            <ThemeConsumer>
                {({theme})=>(
                    <form className="column player" onSubmit={this.handleSubmit.bind(this)}>
                        <label htmlFor="username" className="player-label">
                            {this.props.label}
                        </label>
                        <div className="row player-inputs">
                            <input 
                            type="text" 
                            id="username" 
                            className={`input-${theme}`}
                            placeholder="github username"
                            autoComplete = "off"
                            value={this.state.username}
                            onChange={this.handleChange.bind(this)}
                            />
                            <button 
                            type="submit"
                            className={`btn btn-${theme === 'dark'? 'light' : 'dark'}`}
                            disabled={!this.state.username}
                            >SUBMIT
                            </button>
                        </div>
                    </form>
                )}
            </ThemeConsumer>
        );
    }
}

PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}


function PlayerPreview({ username, onReset, label}) {
    
    return(
        <ThemeConsumer>
            {({theme})=>(
                <div className="column player">
                    <h3 className="player-label">{label}</h3>
                    <div className={`row bg-${theme}`}>
                        <div className="player-info">
                            <img src={`https://github.com/${username}.png?size=200`} alt={`avatar for ${username}`} className="avatar-small" />
                            <a href={`https://github.com/${username}`} className="link">{username}</a>
                        </div>
                        <button className="btn-clear flex-center" onClick={onReset}>
                            <FaTimesCircle color="rgb(194, 57, 42)" size={26}/>
                        </button>
                    </div>
                </div>
            )}
        </ThemeConsumer>
    )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

export default class Battle extends React.Component{

    constructor(props){
        super(props);

        this.state={
            playerOne: null,    
            playerTwo: null,
            battle: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onReset =  this.onReset.bind(this);
    }

    handleSubmit(id, player){
        this.setState({
            [id]: player
        })
    }

    onReset(id){
        this.setState({
            [id]: null
        })
    }

    render(){
        const {playerOne, playerTwo, battle } = this.state;

        if(battle == true){
            return <Results playerOne={playerOne} playerTwo={playerTwo} onResetClick={()=>{this.setState({
                playerOne: null,
                playerTwo: null,
                battle: false
            })}}/>
        }

        return (
            <React.Fragment>
                <Instructions />
                <div className="players-container">
                    <h1 className="center-text header-lg">Players</h1>
                    <div className="row space-around">
                        {playerOne === null 
                        ? <PlayerInput 
                            label="Player One" 
                            onSubmit={(player) => { this.handleSubmit('playerOne', player) }} /> 
                        : <PlayerPreview 
                            username={playerOne} 
                            label='player One' 
                            onReset={()=>{this.onReset('playerOne')}} />}
                        { playerTwo === null 
                        ? <PlayerInput 
                            label="Player Two" 
                            onSubmit={(player)=> {this.handleSubmit('playerTwo', player)}}/>
                        : <PlayerPreview 
                            username={playerTwo} 
                            label='player Two' 
                            onReset={()=>{this.onReset('playerTwo')}}/>}
                    </div>
                    {playerOne && playerTwo && 
                    <button className="btn btn-dark btn-space" 
                    onClick={()=> this.setState({battle: true})}
                    >Battle</button>}
                </div>
            </React.Fragment>

        );
    }

}