import React from 'react';
// If using Bootstrap, uncomment the next line
// import 'bootstrap/dist/css/bootstrap.min.css';

function FormInput({ label, value, onChange, type = 'text', name, placeholder }) {
    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="form-control" // This class is for Bootstrap, adjust if not using Bootstrap
                placeholder={placeholder}
            />
        </div>
    );
}

export default FormInput;
