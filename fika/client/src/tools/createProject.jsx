import React, { Component } from 'react';
import "../sidebar/sidebarStyle.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faSearch,
    faProjectDiagram
} from "@fortawesome/free-solid-svg-icons";

class CreateProject extends Component {
    state = {
        newProject: {
            name: null,
            template: "columns",
            startDate: null,
            endDate: null,
        }
    }
    handleChange = e => {
        let value = e.target.value;
        let text = this.state.newProject.name;
        this.setState({ newProject: { ...this.state.newProject, ["name"]: value } });
    };

    handleCancel = () => {
        this.setState({ quickNote: { text: "" } });
        this.props.handleClose();
    };

    render() {
        const textAreaStyle = {
            backgroundColor: "lightgoldenrodyellow",
            border: "none"
        };
        const textAreaStyle2 = {
            backgroundColor: "lightgoldenrodyellow",
            border: "none",
            width: "70%",
            borderBottom: "solid 1px lightgray"
        };
        const pDivStyle = {
            borderTop: "solid 1px lightgray",
            marginTop: "12px"
        };
        const minimized = {
            left: "82px"
        }
        return (<React.Fragment>
            {this.props.isMinimized === true && (
                <div className="minimizedNote">
                    <button
                        className="minimizedButton"
                        style={minimized}
                        onClick={() => {
                            this.props.handleMinimize();
                        }}
                    >
                        <FontAwesomeIcon icon={faProjectDiagram} size="sm" />
                    </button>
                </div>
            )}
            {/* need function that will handle clickouts. 
            if form is partially filled quicknote will minimize so data will not be lost. 
            //if clickout detected and this.state.quickNote contains value */}
            {this.props.isMinimized === false && (
                <div
                    className="newProject"
                    ref={node => (this.node = node)}
                    onClick={this.minimize}
                >
                    <h4>
                        New Project
                  <span style={{ float: "right" }}>
                            <button
                                className="noteButton"
                                onClick={this.props.handleMinimize}
                            >
                                -
                    </button>
                        </span>
                    </h4>
                    <input
                        placeholder="Project Name"
                        style={textAreaStyle}
                        onChange={this.handleChange}
                        value={this.state.newProject.name ? this.state.newProject.name : ""}
                    ></input>
                    <select dataname="template" required>
                        <option value="" hidden>Select Template</option>
                        <option value="list">Default-List</option>
                        <option value="column">Default-Columns</option>
                        <option value="custom">Custom</option>
                    </select>
                    <div style={pDivStyle}>
                        <p style={{ marginTop: "10px" }}>Select Start Date</p>
                    </div>
                    <select dataname="startdate" required>
                        <option value="" hidden>Month</option>
                        <option value="1">January</option>
                        <option value="1">February</option>
                        <option value="1">March</option>
                        <option value="1">April</option>
                        <option value="1">May</option>
                        <option value="1">June</option>
                        <option value="1">July</option>
                        <option value="1">August</option>
                        <option value="1">September</option>
                        <option value="1">October</option>
                        <option value="1">November</option>
                        <option value="1">December</option>
                    </select>
                    <div style={{ float: "right", marginTop: "10px" }}>
                        <button className="noteButton" onClick={this.handleCancel}>
                            Cancel
                  </button>
                        <button className="noteButton" onClick={this.handleSubmit}>
                            Submit
                  </button>
                    </div>
                </div>
            )}
        </React.Fragment>);
    }
}

export default CreateProject;