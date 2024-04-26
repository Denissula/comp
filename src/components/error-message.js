import React from 'react';

const ErrorMessage = ({message}) => {

    if(message === ""){
        return;
    }

    return (
        <div className="error-container">
            <h5>{message}</h5>
        </div>
    );
};

export default ErrorMessage;