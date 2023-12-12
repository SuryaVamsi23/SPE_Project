import React, { Component } from "react";
import './GroupCard.css';
import { Link } from 'react-router-dom'; 

class GroupCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          group_id: this.props.id
        }
    };

    handleclick = async() => {
      const { group_id } = this.state
      console.log("handle  click ",this.state.group_id)
      this.props.history.push('/groups/${this.state.group_id}');
    }
    state = {};

    render() {
        const { id,groupName,members,cost } = this.props;
        console.log("Statevalue ",this.state.group_id)
        return (
            <div className="groupcontainer">
                <img src={require(`../../assets/groupicon.png`)} alt="Group Icon" className="groupicon" />
                <div className="group-info">
                    <h3>Group Name: {groupName}</h3>
                    <p>Members: {members}</p>
                    <p>Total Expense: {cost}</p>
                    <Link to={`/groups/${this.state.group_id}`}>
                        <button className="view-more-button" on>View More</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default GroupCard;