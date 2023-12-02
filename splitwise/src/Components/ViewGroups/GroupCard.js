import React, { Component } from "react";
import './GroupCard.css';
import { Link } from 'react-router-dom'; 

class GroupCard extends Component {
    constructor(props) {
        super(props);
    }

    state = {};

    render() {
        const { groupName } = this.props;

        return (
            <div className="groupcontainer">
                <img src={require(`../../assets/groupicon.png`)} alt="Group Icon" className="groupicon" />
                <div className="group-info">
                    <h3>Group Name: {groupName}</h3>
                    <p>Members: 5</p>
                    <p>Total Expense: $1000</p>
                    <Link to="/groups">
                        <button className="view-more-button">View More</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default GroupCard;
