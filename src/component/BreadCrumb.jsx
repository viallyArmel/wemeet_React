import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ labels, endPoints }) => {

    function listingBreadCrumb() {
        let output = [];
        for (let i = 0; i < labels.length; i++) {
            i < labels.length - 1 && output.push(<li key={i} className="breadcrumb-item"><Link to={endPoints[i]}> {labels[i]} </Link></li>);
            i === labels.length - 1 && output.push(<li key={i} className="breadcrumb-item active"> {labels[i]} </li>);
        }
        return output;
    }

    return (
        <div className="container-fluid">
            <ol className="breadcrumb">
                {listingBreadCrumb()}
            </ol>
        </div>
    );
}

export default BreadCrumb;