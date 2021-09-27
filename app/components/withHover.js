import React, { Component } from 'react';

export default function withHover(Component, propName='hovering'){
    
    return class WithHover extends React.Component{
        constructor(props){
            super();

            this.state = {
                hovering: false
            }
        }

        onMouseOver(){
            this.setState({
                hovering: true
            })
        }
        onMouseOut(){
            this.setState({
                hovering: false
            })
        }

        render(){
            const props = {
                [propName]: this.state.hovering,
                ...this.props
            }
            return (
                <div onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)}>
                    <Component {...props}/>
                </div>
            );
        }
    }
    
}