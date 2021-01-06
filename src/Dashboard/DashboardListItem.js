import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';


class DashboardListItem extends Component {
    state = {
        time: ''
    }
    componentDidMount(){
        this.convertUnix(this.props.form.time);
    }
    convertUnix = (unixTime) =>{
        // Unixtimestamp
        var unixtimestamp = unixTime;

        // Months array
        var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

        // Convert timestamp to milliseconds
        var date = new Date(unixtimestamp*1000);

        // Year
        var year = date.getFullYear();

        // Month
        var month = months_arr[date.getMonth()];

        // Day
        var day = date.getDate();

        // Hours
        var hours = date.getHours();

        // Minutes
        var minutes = "0" + date.getMinutes();

        // Seconds
        var seconds = "0" + date.getSeconds();

        // Display date time in MM-dd-yyyy h:m:s format
        var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        
        // return convdataTime;
        this.setState({
            time: convdataTime
        })
        
    }

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
                <p className="single-dashboard-list-item dashboard-list-item-date">{this.state.time}</p>
                <p className="single-dashboard-list-item dashboard-list-item-response-num">{this.props.form.numOfResponses}</p>
                <div className="single-dashboard-list-item dashboard-btns-right">
                    <NavLink to={`/responses/${this.props.form._id}`} className="view-responses-btn">View<br/>Responses</NavLink>
                </div>
            </div>
        );
    }
}
 
export default DashboardListItem;