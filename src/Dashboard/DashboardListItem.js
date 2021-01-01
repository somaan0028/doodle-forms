import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';


class DashboardListItem extends Component {
    // state = {  }
    render() { 
        return ( 
            <div className="dashboard-list-item" key={this.props.form._id}>
                <div className="single-dashboard-list-item dashboard-list-item-name">
                    <p className="dashboard-formName">{this.props.form.formName}</p>
                    <NavLink className="dashboard-editing-btns" to={`/edit/${this.props.form._id}`}>Edit</NavLink>
                    {/* | */}
                    <button className="dashboard-editing-btns" onClick={this.props.deleteForm} id={this.props.form._id}>Delete</button>
                    {/* | */}
                    <button className="dashboard-editing-btns" onClick={this.props.copyLink} id={this.props.form._id}>Copy Link</button>
                </div>
                <p className="single-dashboard-list-item dashboard-list-item-date">12-Dec-2050</p>
                <p className="single-dashboard-list-item dashboard-list-item-response-num">93</p>
                <div className="single-dashboard-list-item dashboard-btns-right">
                    <NavLink to={`/responses/${this.props.form._id}`} className="view-responses-btn">View<br/>Responses</NavLink>
                </div>
            </div>
        );
    }
}
 
export default DashboardListItem;