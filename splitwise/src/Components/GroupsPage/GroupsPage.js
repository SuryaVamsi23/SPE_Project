import React, { Component } from "react";
import './GroupsPage.css';

class GroupsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeButton: "View Transactions",
            members: [
                { name: "Ram", email: "ram@gmail.com" },
                { name: "Poornesh", email: "poornesh@rediffmail.com" },
                { name: "Surya", email: "surya@yahoomail.com" },
                { name: "Rithvik", email: "rithvik@outlook.com" },
                { name: "Sreenivas", email: "sreenivas@gmail.com" },
            ],
        };
    }

    handleButtonClick = (buttonName) => {
        this.setState({
            activeButton: buttonName,
        });
    }

    renderMembers = () => {
        const { members } = this.state;

        return (
            <div className="membersList">
                <h2 className="groupname">Goa Trip</h2>
                <h2 className="groupmembertxt">Group Members</h2>
                <ul>
                    {members.map((member, index) => (
                        <li key={index}>
                            <img
                                src={require(`../../assets/male.png`)}
                                alt={`${member.name} Icon`}
                                className="memberIcon"
                            />
                            <div className="memberInfo">
                                <span className="memberName">{member.name}</span>
                                <span className="memberEmail">{member.email}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    renderOuterBar = () => {
        const { activeButton } = this.state;
        if (activeButton === "Add Expense") {
            return <div className="outerbar">Outer Bar for Add Expense</div>;
        } else if (activeButton === "View Transactions") {
            return <div className="outerbar"></div>;
        } else if (activeButton === "View Group Members") {
            return (
                <div className="outerbar">
                    {this.renderMembers()}
                </div>
            );
        } else if (activeButton === "Invite") {
            return <div className="outerbar">Outer Bar for Invite</div>;
        } else {
            return null;
        }
    }

    render() {
        const { activeButton } = this.state;

        return (
            <div>
                <div className="container">
                    <t className="containertext">Splitwise</t>
                </div>
                <div className="body">
                    <div className="buttoncontainer">
                        <button
                            className={`addExpense ${activeButton === "View Transactions" ? "active" : ""}`}
                            onClick={() => this.handleButtonClick("View Transactions")}
                        >
                            View Transactions
                        </button>
                        <button
                            className={`addExpense ${activeButton === "Add Expense" ? "active" : ""}`}
                            onClick={() => this.handleButtonClick("Add Expense")}
                        >
                            Add Expense
                        </button>
                        <button
                            className={`addExpense ${activeButton === "View Group Members" ? "active" : ""}`}
                            onClick={() => this.handleButtonClick("View Group Members")}
                        >
                            View Group Members
                        </button>
                        <button
                            className={`addExpense ${activeButton === "Invite" ? "active" : ""}`}
                            onClick={() => this.handleButtonClick("Invite")}
                        >
                            Invite
                        </button>
                    </div>
                    {this.renderOuterBar()}
                </div>
            </div>
        );
    }
}

export default GroupsPage;
