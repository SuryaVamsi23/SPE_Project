import React, { Component } from 'react';
import './ViewGroups.css';
import GroupCard from './GroupCard';
import Cookies from 'js-cookie';  
import baseurl from '../Baseurl';

class ViewGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
      newGroupName: '',
      groups: {}
    };
  }

  componentDidMount(){
    this.fetchGroups();
  }

  componentDidUpdate() {
    this.fetchGroups();
  }
  
  fetchGroups = async () => {
    try {
      const newurl = baseurl + 'return_groups';
      console.log(newurl);
      var cookie = Cookies.get('cookie');
      await fetch(newurl,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: cookie
        })
      }).then(res=>res.json()).then((response=>{
        console.log(response.name)
        this.setState({
          groups: response
        })
      }))
    } catch (error) {
      console.error('Error:', error);
    }
  };
  togglePopup = () => {
    this.setState((prevState) => ({
      isPopupOpen: !prevState.isPopupOpen,
      newGroupName: '', 
    }));
  };

  handleInputChange = (e) => {
    this.setState({ newGroupName: e.target.value });
  };

  handleAddGroup = async() => {
    console.log('Adding group:', this.state.newGroupName);
    try {
      const newurl = baseurl + 'create_group';
      console.log(newurl);
      var cookie = Cookies.get('cookie');
      console.log(cookie)
      await fetch(newurl,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: cookie,
          group_name: this.state.newGroupName
        })
      }).then(res=>res.json()).then((response=>{
          console.log('new created');
      }))
    } catch (error) {
      console.error('Error:', error);
    }

    this.togglePopup();
  };

  render() {
    const groups  = this.state.groups;
    return (
      <div>
        <div className="viewgroupcontainer">
          <span className="containertext">Splitwise</span>
          <div className="viewgroupwrapper-container">
            <div className="viewgroupwrapper">
              <div className="viewgroupbody">
              <span className = "yourgroups">Your Groups</span>
              {Object.entries(groups).map(([key, value]) => (
            <GroupCard id={value.id} groupName={value.name} members={0} cost={value.cost} />
          ))}
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