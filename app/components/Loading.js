import React from 'react';

export default class Loading extends React.Component{
    constructor(props){
        super();

        this.state ={
            loadingText: props.loading
        }
    }

    componentDidMount(){
        this.interval = window.setInterval(()=>{
            this.state.loadingText === (this.props.loading + '...')
            ? this.setState({
                loadingText: this.props.loading
            })
            : this.setState(({loadingText})=> ({
                loadingText: loadingText + '.'
            }))
        } ,300);
    }

    componentWillUnmount(){
        window.clearInterval(this.interval);
    }

    render(){
        return (
            <h1 className="header-lg center-text">{this.state.loadingText}</h1>
        );
    }
}

Loading.defaultProps = {
    loading: 'Loading'
}