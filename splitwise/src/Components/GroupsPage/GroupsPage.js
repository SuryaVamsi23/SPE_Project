// GroupsPage.js

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
            transactions: [
                { description: "Food", amount: 50 },
                { description: "Petrol", amount: 30 },
                { description: "Hotel", amount: 100 },
            ],
            newExpenseDescription: "",
            newExpenseAmount: "",
            selectedParticipants: [],
        };
    }
    handleParticipantChange = (selectedParticipants) => {
        this.setState({ selectedParticipants });
    }

    handleButtonClick = (buttonName) => {
        this.setState({
            activeButton: buttonName,
        });
    }

    handleButtonClick = (buttonName) => {
        this.setState({
            activeButton: buttonName,
        });
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleAddExpense = () => {
        const { members, selectedParticipants } = this.state;

        return (
            <div className="addExpenseForm">
                <input
                    type="text"
                    placeholder="Expense Description"
                    name="newExpenseDescription"
                    value={this.state.newExpenseDescription}
                    onChange={this.handleInputChange}
                />
                <input
                    type="number"
                    placeholder="Expense Amount"
                    name="newExpenseAmount"
                    value={this.state.newExpenseAmount}
                    onChange={this.handleInputChange}
                />
                <label>Select Participants:</label>
                <select
                    multiple
                    name="selectedParticipants"
                    value={selectedParticipants}
                    onChange={(e) => this.handleParticipantChange(Array.from(e.target.selectedOptions, option => option.value))}
                >
                    {members.map((member) => (
                        <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                </select>
                <button onClick={this.handleAddExpense}>Add Expense</button>
            </div>
        );
    }

    renderInvite = () => {
        const { invitationEmail } = this.state;

        return (
            <div>
                <h2 className="groupname">Goa Trip</h2>
                <h2 className="groupmembertxt">Invite Members</h2>
                <input className="invitebox"
                    type="email"
                    placeholder="Enter email address"
                    name="invitationEmail"
                    value={invitationEmail}
                    onChange={this.handleInputChange}
                />
                <button className= "invitebutton" onClick={this.handleSendInvitation}>Send Invitation</button>
            </div>
        );
    }

    renderAddExpenseForm = () => {
        const { transactions, members } = this.state;

        if (!transactions || transactions.length === 0 || !members) {
            return <p>No transactions or members available.</p>;
        }
    
        return (
            <div className="transactionsList">
                <h2 className="groupname">Goa Trip</h2>
                <h2 className="groupmembertxt">Transactions</h2>
                <ul>
                    {transactions.map((transaction) => {
                        const participantNames = transaction.participants.map((participantId) => {
                            const participant = members.find((member) => member.id === participantId);
                            return participant ? participant.name : null;
                        });
    
                        return (
                            <li key={transaction.id} className="transactions">
                                <span className="transactionDescription">{transaction.description}</span>
                                <span className="transactionAmount">${transaction.amount}</span>
                                <div className="participants">
                                    {participantNames.map((participantName, index) => (
                                        <span key={index} className="participantName">
                                            {participantName}
                                        </span>
                                    ))}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
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

    renderTransactions = () => {
        const { transactions } = this.state;
        const totalAmount = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    
        return (
            <div className="transactionsList">
                <h2 className="groupname">Goa Trip</h2>
                <h2 className="groupmembertxt">Transactions</h2>
                <ul>
                    {transactions.map((transaction, index) => (
                        <li key={index} className="transactions">
                            <span className="transactionDescription">{transaction.description}</span>
                            <span className="transactionAmount">${transaction.amount}</span>
                        </li>
                    ))}
                    <li className="transactions totalTransaction">
                        <span className="transactionDescription">Total Expense of the group</span>
                        <span className="transactionAmount">${totalAmount}</span>
                    </li>
                </ul>
            </div>
        );
    }

    renderOuterBar = () => {
        const { activeButton } = this.state;
        if (activeButton === "Add Expense") {
            return <div className="outerbar">
                {this.renderAddExpenseForm()}
            </div>;
        } else if (activeButton === "View Transactions") {
            return (
                <div className="outerbar">
                    {this.renderTransactions()}
                </div>
            );
        } else if (activeButton === "View Group Members") {
            return (
                <div className="outerbar">
                    {this.renderMembers()}
                </div>
            );
        } else if (activeButton === "Invite") {
            return <div className="outerbar">
                {this.renderInvite()}
            </div>;
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
