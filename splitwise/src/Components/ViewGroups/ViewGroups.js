import React, { Component } from 'react';
import './ViewGroups.css';
import GroupCard from './GroupCard';

class ViewGroups extends Component {
    constructor(props) {
        super(props);
    }

    state = {};

    render() {
        return (
            <div>
                <div className="viewgroupcontainer">
                    <t className="containertext">Splitwise</t>
                    <div className='viewgroupwrapper-container'>
                        <div className="viewgroupwrapper">
                            <div className='viewgroupbody'>
                                <GroupCard groupName="Goa Trip" />
                                <GroupCard groupName="Punjabi" />
                                <GroupCard groupName="Neeladri" />
                                <GroupCard groupName="Budideties" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewGroups;
