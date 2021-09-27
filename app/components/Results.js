import React from 'react';
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser} from 'react-icons/fa';
import PropTypes from 'prop-types';

import {battle} from '../utils/api';
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';

function ProfileList ({profile}) {
        return (
            <ul className="card-list">
                <li>
                    <FaUser color="rgb(239, 115, 115)" size={22}></FaUser>
                    {profile.name }
                </li>
                {profile.location && 
                <Tooltip text="User's location">
                    <li>
                        <FaCompass color="rgb(144, 115, 255)" size={22} />
                        {profile.location}
                    </li>
                </Tooltip>}
                {profile.company && 
                <Tooltip text="User's company">
                    <li>
                        <FaBriefcase color="#795548" size={22}/>
                        {profile.company}
                    </li>
                </Tooltip>
                }
                <li>
                    <FaUsers color="rgb(129, 195, 245)" size={22}/>
                    {profile.followers.toLocaleString()} followers
                </li>
                <li> <FaUserFriends color="rgb(64, 183, 95)" size={22} />
                    {profile.following.toLocaleString()} following
                </li>
                <li>
                    <FaCode color="rgb(59, 76, 85)" size={22} />
                    {profile.repositories} repositories
                </li>
            </ul>
        );
}

ProfileList.propTypes = {
    profile: PropTypes.object.isRequired
}

export default class Results extends React.Component{   
    constructor(props){
        super(props);

        this.state = {
            winner: null, 
            loser: null, 
            loading: true,
            error: null
        }
    }

    componentDidMount(){
        const {playerOne, playerTwo} = this.props;
        battle([playerOne, playerTwo])
        .then((players)=>{
            this.setState({
                winner: players[0],
                loser: players[1],
                loading: false,
                error: null
            })
        }).catch(({message})=>{
            this.setState({
                error: message
            })
        })
    }

    render(){   
        const {winner, loser, error, loading} = this.state;
        if(loading === true){
            return <Loading loading='Loading'/>
        }
        if(error){
            return(
                <p className="center-text error">{error}</p>
            );
        }
        return(
            <>
            <div className="grid space-around container-sm">
                <div>
                    <Card header={winner.score == loser.score ? 'Tie': 'Winner'}
                     subHeader={winner.score.toLocaleString()} avatar={winner.profile.avatar_url} href={winner.profile.html_url} name={winner.profile.login}>
                        <ProfileList profile={winner.profile} />
                    </Card>        
                </div>
                <div>
                    <Card header={winner.score == loser.score ? 'Tie': 'Loser'}
                     subHeader={loser.score.toLocaleString()} avatar={loser.profile.avatar_url} href={loser.profile.html_url} name={loser.profile.login}>
                        <ProfileList profile={loser.profile} />
                    </Card>  
                </div>
            </div>
            <button className="btn btn-dark btn-space" onClick={this.props.onResetClick}>Reset</button>
            </>
        );
    }
}

Results.propTypes = {
    playerOne: PropTypes.string.isRequired,
    playerTwo: PropTypes.string.isRequired,
    onResetClick: PropTypes.func.isRequired
}