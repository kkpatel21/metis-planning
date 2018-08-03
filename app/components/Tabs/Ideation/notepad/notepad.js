import React, { Component } from 'react';
import { Tab, Input } from 'semantic-ui-react';

export default class Notepad extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>
            <Input placeholder="Write your ideas here!" />
            </div>
        )
    }
}