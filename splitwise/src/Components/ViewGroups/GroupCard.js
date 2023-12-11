import React, { Component } from "react";
import './GroupCard.css';
import { Link } from 'react-router-dom'; 

class GroupCard extends Component {
    constructor(props) {
        super(props);
    }

    state = {};

    render() {
        const { groupName,members,cost } = this.props;

        return (
            <div className="groupcontainer">
                <img src={require(`../../assets/groupicon.png`)} alt="Group Icon" className="groupicon" />
                <div className="group-info">
                    <h3>Group Name: {groupName}</h3>
                    <p>Members: {members}</p>
                    <p>Total Expense: {cost}</p>
                    <Link to="/groups">
                        <button className="view-more-button">View More</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default GroupCard;
