import React, { Component } from "react";
import './GroupsPage.css';
import { Link } from 'react-router-dom';
import baseurl from '../Baseurl';
import Cookies from 'js-cookie';

class GroupsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeButton: "View Transactions",
            members: [
                // { id: 1, name: "Ram", email: "ram@gmail.com" },
                // { id: 2, name: "Poornesh", email: "poornesh@rediffmail.com" },
                // { id: 3, name: "Surya", email: "surya@yahoomail.com" },
                // { id: 4, name: "Rithvik", email: "rithvik@outlook.com" },
                // { id: 5, name: "Sreenivas", email: "sreenivas@gmail.com" },
                // { id: 6, name: "Prasanth", email: "prasanth@gmail.com" },
                // { id: 7, name: "Budi", email: "budi369@gmail.com" }
            ],
            transactions: [
                // { id: 1, description: "Food", amount: 50, paidby: 1, participants: [1, 2, 3] },
                // { id: 2, description: "Petrol", amount: 30, paidby: 4, participants: [2, 3, 4] },
                // { id: 3, description: "Hotel", amount: 100, paidby: 6, participants: [1, 4, 5, 6, 7] },
            ],
            simplify: [],
            group_id: this.props.match.params.group_id,
            groupName: this.props.match.params.groupName,
            newExpenseDescription: "",
            newExpenseAmount: "",
            isTransactionPopupOpen: false,
            selectedParticipants: [],
            invitationEmail: ""
        };
    }

    componentDidMount() {
        this.handlerendernames();
        this.uptransactions();
    }

    handlerendernames = () => {
        const { group_id, members } = this.state;
        const newurl = baseurl + 'get_participants';
        fetch(newurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                group_id: group_id,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to send invitation');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ members: data })
                console.log(members)
            })
            .catch(error => {
                console.error('Error sending invitation', error);
            });
    };
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

    closeTransactionPopup = () => {
        this.setState({
            isTransactionPopupOpen: false,
            selectedTransaction: null,
        });
    };


    handleAddExpense = () => {
        const { group_id, members, selectedParticipants, newExpenseDescription, newExpenseAmount } = this.state;
        console.log("In add expense")
        var cookie = Cookies.get('name');
        const newurl = baseurl + 'create_expense';
        console.log(newurl)
        console.log("Printing participants", selectedParticipants)
        fetch(newurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                payer: cookie,
                group_id: group_id,
                amount: newExpenseAmount,
                des: newExpenseDescription,
                participants: selectedParticipants
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to send invitation');
                }
                return response.json();
            })
            .then(data => {

            })
            .catch(error => {
                console.error('Error sending invitation', error);
            });


        this.setState(({
            newExpenseDescription: "",
            newExpenseAmount: "",
            selectedParticipants: [],
        }));
        console.log(this.state.selectedParticipants);
    };

    renderAddExpenseForm = () => {
        console.log(this.state.group_id);
        const { members, newExpenseDescription, newExpenseAmount, selectedParticipants } = this.state;

        const handleToggleParticipant = (participantName) => {
            const isSelected = selectedParticipants.includes(participantName);
            const updatedParticipants = isSelected
                ? selectedParticipants.filter(name => name !== participantName)
                : [selectedParticipants, participantName];
            const filteredParticipants = updatedParticipants.filter(item => typeof item === 'string');
            this.setState({
                selectedParticipants: updatedParticipants,
            });

            console.log("In toggle", updatedParticipants)
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
                        <div key={member.name} className="participantItem">
                            <input
                                type="checkbox"
                                id={member.name}
                                checked={selectedParticipants.includes(member.name)}
                                onChange={() => handleToggleParticipant(member.name)}
                            />
                            <label htmlFor={member.name}>{member.name}</label>
                        </div>
                    ))}
                </div>
                <div className="selectedParticipants">
                    <label className="Selectedparticipant">Selected Participants:</label>
                    {selectedParticipants.length > 0 ? (
                        <div>
                            {selectedParticipants.map((participantName, index) => {
                                return (
                                    <span key={participantName} className="selectedParticipant">
                                        {participantName}
                                        {index !== selectedParticipants.length - 1 && ", "}
                                    </span>
                                );
                            })}
                        </div>
                    ) : (
                        <p>No participants selected.</p>
                    )}
                </div>
                <button className="expenseButton" onClick={this.handleAddExpense}>
                    Add Expense
                </button>
            </div>
        );
    };


    handleSendInvitation = () => {
        const { group_id, invitationEmail } = this.state;
        const newurl = baseurl + 'update_group';
        console.log(newurl)
        fetch(newurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                group_id: group_id,
                user_name: invitationEmail,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to send invitation');
                }
                return response.json();
            })
            .then(data => {
                console.log('Invitation sent successfully', data);
                this.setState({ invitationEmail: '' });
            })
            .catch(error => {
                console.error('Error sending invitation', error);
            });
    }

    renderInvite = () => {
        console.log(this.state.groupName)
        const { invitationEmail } = this.state;

        return (
            <div>
                <h2 className="groupname">{this.state.groupName}</h2>
                <h2 className="groupmembertxt">Add Members</h2>
                <input className="invitebox"
                    type="username"
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
        console.log(this.state.members);
        return (
            <div className="membersList">
                <h2 className="groupname">{this.state.groupName}</h2>
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

    handleTransactionClick = (transaction) => {
        this.setState({
            isTransactionPopupOpen: true,
            selectedTransaction: transaction,
        });
    };

    renderTransactionPopup = () => {
        const { isTransactionPopupOpen, selectedTransaction, members, isUpdateMode, updatedTransaction, selectedParticipants } = this.state;

        if (!isTransactionPopupOpen || !selectedTransaction) {
            return null;
        }
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
            <div className="transactionPopup">
                <h3>{isUpdateMode ? 'Update Transaction' : 'Transaction Details'}</h3>
                <p>Description:
                    {isUpdateMode ?
                        (
                            <input
                                type="text"
                                placeholder="Expense Description"
                                className="expenseInput"
                                name="newExpenseDescription"
                                value={updatedTransaction.description}
                                onChange={this.handleInputChange}
                            />

                        ) : (
                            selectedTransaction.description
                        )}
                </p>
                <p>Amount:
                    {isUpdateMode ?
                        (
                            <input
                                type="number"
                                placeholder="Expense Amount"
                                className="expenseAmountInput"
                                name="newExpenseAmount"
                                value={updatedTransaction.amount}
                                onChange={this.handleInputChange}
                            />
                        ) : (
                            `$${selectedTransaction.amount}`
                        )}
                </p>
                <p>Paid by: {members.find(member => member.id === selectedTransaction.participants[0]).name}</p>
                <p>Participants:
                    {isUpdateMode ? (
                        members.map((member) => (
                            <div key={member.email} className="participantItem">
                                <input
                                    type="checkbox"
                                    id={member.email}
                                    checked={selectedParticipants.includes(member.email)}
                                    onChange={() => handleToggleParticipant(member.email)}
                                />
                                <label htmlFor={member.email}>{member.name}</label>
                            </div>
                        ))
                    ) : (
                        selectedTransaction.participants.map(participantId => members.find(member => member.id === participantId).name).join(", ")
                    )}
                </p>
                <p>
                    {isUpdateMode ? (
                        <React.Fragment>
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
                        </React.Fragment>
                    ) : null}
                </p>
                <button onClick={isUpdateMode ? this.handleSaveUpdate : this.closeTransactionPopup}>
                    {isUpdateMode ? 'Save' : 'Close'}
                </button>
                {!isUpdateMode && <button onClick={this.handleUpdateTransaction}>Update</button>}
            </div>
        );
    };

    handleUpdateTransaction = () => {
        this.setState({
            isUpdateMode: true,
            updatedTransaction: {
                description: this.state.selectedTransaction.description,
                amount: this.state.selectedTransaction.amount,
                participants: [...this.state.selectedTransaction.participants]
            }
        });
    };

    handleSaveUpdate = () => {
        console.log("Updated transaction details:", this.state.updatedTransaction);


        this.setState(prevState => ({
            selectedParticipants: [],
        }));
        console.log(this.state.selectedParticipants);

        this.setState({
            isTransactionPopupOpen: false,
            selectedTransaction: null,
            isUpdateMode: false,
            updatedTransaction: {
                description: '',
                amount: 0,
                participants: []
            }
        });
    };

    closeTransactionPopup = () => {
        this.setState({
            isTransactionPopupOpen: false,
            selectedTransaction: null,
            isUpdateMode: false,
            updatedTransaction: {
                description: '',
                amount: 0,
                participants: []
            }
        });
    };

    uptransactions = () => {
        const { group_id, members } = this.state;
        const newurl = baseurl + 'return_expenses';
        fetch(newurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                group_id: group_id,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to send invitation');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ transactions: data })
            })
            .catch(error => {
                console.error('Error sending invitation', error);
            });
            const newurl1 = baseurl + 'simplify';
            fetch(newurl1, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    group_id: group_id,
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to send invitation');
                    }
                    return response.json();
                })
                .then(data => {
                    this.setState({ simplify: data })
                    console.log("Simplify",this.state.simplify)
                })
                .catch(error => {
                    console.error('Error sending invitation', error);
                });        
    }
    renderTransactions = () => {
        const { transactions, groupName,simplify } = this.state;
    
        return (
            <div className="transactionsList">
                <h2 className="groupname">{groupName}</h2>
                <h2 className="groupmembertxt">Transactions</h2>
                <ul>
                    {transactions.map((transaction, index) => (
                        <li key={index} className="transactions">
                            <span className="transactionDescription">{transaction.name}</span>
                            <span className="transactionAmount">${transaction.amount}</span>
                        </li>
                    ))}
                    <li className="transactions totalTransaction">
                        {simplify.map((transaction, index) => (
                        <li key={index} className="transactions">
                            <span className="transactionDescription">{transaction.debtor} owes {transaction.creditor} </span>
                            <span className="transactionAmount">${transaction.amount}</span>
                        </li>
                    ))}
                    </li>
                </ul>
                {this.renderTransactionPopup()}
            </div>
        );
    };
    

    renderOuterBar = () => {
        const { activeButton } = this.state;
        if (activeButton === "Add Expense") {
            return (<div className="outerbar">
                {this.renderAddExpenseForm()}
            </div>);
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
                    <span className="containertext">Splitwise</span>
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