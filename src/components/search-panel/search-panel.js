import React from "react";

import "./search-panel.css"

 const SearchPanel = props => {
        const placeholder = 'Enter the name of the city';
        return (
            <div className="container">
                <form
                    className="form-inline"
                    onSubmit={props.handleSubmit}
                >
                    <div>{props.error ? error() : ""}</div>
                    <input
                        className="form-control mr-sm-2"
                        type="search"
                        name="city"
                        placeholder={placeholder}
                    />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        );
}

const error = props => {
    return (
        <div className="alert alert-danger mx-5" role="alert">
            Please Enter City...!
        </div>
    );
};

export default SearchPanel;