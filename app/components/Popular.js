import React from 'react';
import PropTypes from 'prop-types';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle, } from 'react-icons/fa';

import {fetchPopularRepos} from '../utils/api';  
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';

function SelectedLanguage({selected, updateLanguage}) {
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

     return(
            <ul className="flex-center">
                {languages.map((lang)=>(
                    <li key={lang}>
                        <button className="btn-clear nav-link"
                        style={lang === selected? {color: 'red'}: null}
                        onClick={()=>updateLanguage(lang)}>
                             {lang}
                        </button></li>
                ))}
            </ul>

        )
}

SelectedLanguage.propTypes = {
    selected: PropTypes.string.isRequired,
    updateLanguage: PropTypes.func.isRequired
}

//Repos Grid

function ReposGrid({repos}){
    return (
        <ul className="grid space-around">
            {repos.map((repo, index)=>{
                const { name, owner, html_url, stargazers_count, forks, open_issues } = repo;
                const {login, avatar_url} = owner;

                return (<li key={name}>
                            <Card header={`#${index + 1}`} avatar={avatar_url} href={html_url} name={login}>
                            <ul className="card-list">
                                <Tooltip text="user's username">
                                    <li>
                                        <FaUser color="rgb(255, 191, 116)" size={22}></FaUser>
                                        {login}
                                    </li>
                                </Tooltip>
                                <li>
                                    <FaStar color="yellow" size={22}/> 
                                    {stargazers_count.toLocaleString()} stars
                                </li>
                                <li>
                                    <FaCodeBranch color="green" size={22}/>
                                    {forks.toLocaleString()} forks</li>
                                <li>
                                    <FaExclamationTriangle color="red" size={22}/>
                                    {open_issues.toLocaleString()} open issues</li>
                                
                            </ul>
                            </Card>
                        </li>)
            })}
        </ul>
    );
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

export default class Popular extends React.Component{
    constructor(){
        super();

        this.state = {
            selectedLanguage: 'All',
            error: null,
            repos: {}
        }
        this.updateSelectedLanguage = this.updateSelectedLanguage.bind(this);
        this.isLoading = this.isLoading.bind(this);
    }

    componentDidMount(){
        this.updateSelectedLanguage(this.state.selectedLanguage);
    }

    updateSelectedLanguage(selectedLanguage){
        this.setState({
            selectedLanguage,
            error: null
        });

        if(!this.state.repos[selectedLanguage]){
            fetchPopularRepos(selectedLanguage)
                .then((data)=> {
                    this.setState(({repos}) =>({
                        repos:{
                            ...repos,
                            [selectedLanguage]: data
                        }
                        
                    }))
                })
                .catch((error)=>{
                    console.warn('Error fetching repose', error)
                    this.setState({
                        error: `There was an error fetching the repositories`
                    })
                })
        }
        
    }

    isLoading(){
        const {selectedLanguage, repos, error} = this.state; 

        return !this.state.repos[selectedLanguage] && this.state.error === null;
    }
    
    
    render(){
        
        // console.log('state', this.state);
       
        const {selectedLanguage, repos, error} = this.state; 
        return (
            <React.Fragment>
                <SelectedLanguage selected={selectedLanguage} updateLanguage={this.updateSelectedLanguage}/>
                {this.isLoading() && <Loading loading='Fectching Repos'/>}
                {error && <p className="center-text error">{error}</p>}
                {repos[selectedLanguage] && <ReposGrid repos ={repos[selectedLanguage]} />}
            </React.Fragment>

        )
    }
}
