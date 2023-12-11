import React, { Component } from 'react';
import './ViewGroups.css';
import GroupCard from './GroupCard';

class ViewGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
      newGroupName: '',
    };
  }

  togglePopup = () => {
    this.setState((prevState) => ({
      isPopupOpen: !prevState.isPopupOpen,
      newGroupName: '', 
    }));
  };

  handleInputChange = (e) => {
    this.setState({ newGroupName: e.target.value });
  };

  handleAddGroup = () => {
    console.log('Adding group:', this.state.newGroupName);
    this.togglePopup();
  };

  render() {
    return (
      <div>
        <div className="viewgroupcontainer">
          <span className="containertext">Splitwise</span>
          <div className="viewgroupwrapper-container">
            <div className="viewgroupwrapper">
              <div className="viewgroupbody">
              <span className = "yourgroups">Your Groups</span>
                <GroupCard groupName="Goa Trip" members="6" cost="25000" />
                <GroupCard groupName="Punjabi" members="4" cost="1000"/>
                <GroupCard groupName="Neeladri" members="2" cost="500"/>
                <GroupCard groupName="Budideties" members="8" cost="8000" />
                <GroupCard groupName="timepass" members="12" cost="17000"/>
              </div>
            </div>
          </div>
          <div className="floating-button" onClick={this.togglePopup}>
            +
          </div>
          {this.state.isPopupOpen && (
            <div className="popup">
              <div className="popup-content">
                <h2 className='newgroup'>Add New Group</h2>
                <span className="close" onClick={this.togglePopup}>
                  x
                </span>
                <input
                  type="text"
                  placeholder="Enter group name"
                  value={this.state.newGroupName}
                  onChange={this.handleInputChange}
                />
                <button onClick={this.handleAddGroup}>Add Group</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ViewGroups;
