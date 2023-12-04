import React, { Component } from "react";
import './GroupsPage.css';
import { Link } from 'react-router-dom'; 

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
                { name: "Prasanth", email: "prasanth@gmail.com" }
            ],
            transactions: [
                { id: 1, description: "Food", amount: 50, participants: [1, 2, 3] },
                { id: 2, description: "Petrol", amount: 30, participants: [2, 3, 4] },
                { id: 3, description: "Hotel", amount: 100, participants: [1, 4, 5] },
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
        const { members, selectedParticipants, newExpenseDescription, newExpenseAmount } = this.state;

        const newTransaction = {
            id: Date.now(),
            description: newExpenseDescription,
            amount: parseFloat(newExpenseAmount),
            participants: selectedParticipants.map(participantId => parseInt(participantId, 10)),
        };

        this.setState(prevState => ({
            transactions: [...prevState.transactions, newTransaction],
            newExpenseDescription: "",
            newExpenseAmount: "",
            selectedParticipants: [],
        }));
        console.log(this.state.selectedParticipants);
    };

    renderAddExpenseForm = () => {
        const { members, newExpenseDescription, newExpenseAmount, selectedParticipants } = this.state;

        const handleToggleParticipant = (participantId) => {
            const isSelected = selectedParticipants.includes(participantId);
            const updatedParticipants = isSelected
                ? selectedParticipants.filter(id => id !== participantId)
                : [...selectedParticipants, participantId];

            this.setState({
                selectedParticipants: updatedParticipants,
            });
        };

        return (
            <div className="expenseFormContainer">
                <input
                    type="text"
                    placeholder="Expense Description"
                    className="expenseInput"
                    name="newExpenseDescription"
                    value={newExpenseDescription}
                    onChange={this.handleInputChange}
                />
                <input
                    type="number"
                    placeholder="Expense Amount"
                    className="expenseAmountInput"
                    name="newExpenseAmount"
                    value={newExpenseAmount}
                    onChange={this.handleInputChange}
                />
                <div className="participantList">
                    <label className="Selectedparticipant">Select Participants:</label>
                    {members.map((member) => (
                        <div key={member.email} className="participantItem">
                            <input
                                type="checkbox"
                                id={member.email}
                                checked={selectedParticipants.includes(member.email)}
                                onChange={() => handleToggleParticipant(member.email)}
                            />
                            <label htmlFor={member.email}>{member.name}</label>
                        </div>
                    ))}
                </div>
                <div className="selectedParticipants">
                    <label className="Selectedparticipant">Selected Participants:</label>
                    {selectedParticipants.length > 0 ? (
                        <div>
                            {selectedParticipants.map((participantId, index) => {
                                const participant = members.find(member => member.email === participantId);
                                return (
                                    <span key={participant.email} className="selectedParticipant">
                                        {participant.name}
                                        {index !== selectedParticipants.length - 1 && ", "}
                                    </span>
                                );
                            })}
                        </div>
                    ) : (
                        <p>No participants selected.</p>
                    )}
                </div>
                <button className="expenseButton" onClick={this.handleAddExpense}>Add Expense</button>
            </div>
        );
    };
    renderInvite = () => {
        const { invitationEmail } = this.state;

        return (
            <div>
                <h2 className="groupname">Goa Trip</h2>
                <h2 className="groupmembertxt">Add Members</h2>
                <input className="invitebox"
                    type="email"
                    placeholder="Enter username"
                    name="invitationEmail"
                    value={invitationEmail}
                    onChange={this.handleInputChange}
                />
                <button className="invitebutton" onClick={this.handleSendInvitation}>Add Members</button>
            </div>
        );
    }


    handleRemoveParticipant = (participantId) => {
        const { selectedParticipants } = this.state;
        const updatedParticipants = selectedParticipants.filter(id => id !== participantId);
        this.setState({
            selectedParticipants: updatedParticipants,
        });
    };


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
                            Add Members
                        </button>
                    </div>
                    {this.renderOuterBar()}
                </div>
            </div>
        );
    }
}

export default GroupsPage;