import React from "react";

function AnnotationRow(props) {
    return (
        <div className="annotationRow">
            <div className="annotationParameter">{props.name}</div>
            <div className="annotationContent">{props.value}</div>
        </div>
    )
}

export {AnnotationRow};