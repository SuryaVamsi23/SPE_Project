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
          <t className="containertext">Splitwise</t>
          <div className="viewgroupwrapper-container">
            <div className="viewgroupwrapper">
              <div className="viewgroupbody">
                <GroupCard groupName="Goa Trip" />
                <GroupCard groupName="Punjabi" />
                <GroupCard groupName="Neeladri" />
                <GroupCard groupName="Budideties" />
                <GroupCard groupName="timepass" />
              </div>
            </div>
          </div>
          <div className="floating-button" onClick={this.togglePopup}>
            +
          </div>
          {this.state.isPopupOpen && (
            <div className="popup">
              <div className="popup-content">
                <span className="close" onClick={this.togglePopup}>
                  &times;
                </span>
                <h2 className='newgroup'>Add New Group</h2>
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
