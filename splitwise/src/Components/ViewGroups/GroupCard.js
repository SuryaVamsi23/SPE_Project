import React, { Component } from "react";
import './GroupCard.css';

class GroupCard extends Component {
    constructor(props) {
        super(props);
    }
    
    state = {};

    render() { 
        const { groupName } = this.props;

        return (
            <div className="groupcontainer">
                <img src={require(`../../assets/groupicon.png`)} alt="Group Icon" className="groupicon"/>
                <div className="group-info">
                    <h3>Group Name: {groupName}</h3>
                    <p>Members: 5</p>
                    <p>Total Expense: $1000</p>
                    <button className="view-more-button">View More</button>
                </div>
            </div>
        );
    }
}

export default GroupCard;
