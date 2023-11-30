import React, { Component } from "react";
import './HomeScreen.css';
import { Dropdown } from "bootstrap";
import 'react-slideshow-image/dist/styles.css';
class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        return (<div>
            <div className="container">
                <t className = "containertext">Splitwise</t>
            </div >
            <div className="body">
                <div className="displaycard">
                    <div className="owecard">
                        <t className = "youowetext">You owe</t>
                        <br/>
                        <t className = "amount">1500</t>
                    </div>
                    <div className="getcard">
                        <t className = "youowetext">You get</t>
                        <br/>
                        <t className = "amount">2000</t>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default HomeScreen;