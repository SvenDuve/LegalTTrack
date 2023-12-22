// TimeEntryForm.js
import React, { useState } from 'react';
// Add this import to your TimeEntryForm.js
import './TimeEntryForm.css';


function TimeEntryForm() {
    const [entry, setEntry] = useState({
        client: '',
        department: '',
        project: '',
        startTime: '',
        endTime: '',
        description: ''
    });

    const handleChange = (e) => {
        setEntry({ ...entry, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(entry);
        // Here you would typically send this data to the backend
        // and then clear the form fields
        setEntry({
            client: '',
            department: '',
            project: '',
            startTime: '',
            endTime: '',
            description: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="client"
                value={entry.client}
                onChange={handleChange}
                placeholder="Client"
            />
            <input
                type="text"
                name="department"
                value={entry.department}
                onChange={handleChange}
                placeholder="Department"
            />
            <input
                type="text"
                name="project"
                value={entry.project}
                onChange={handleChange}
                placeholder="Project"
            />
            <input
                type="datetime-local"
                name="startTime"
                value={entry.startTime}
                onChange={handleChange}
            />
            <input
                type="datetime-local"
                name="endTime"
                value={entry.endTime}
                onChange={handleChange}
            />
            <textarea
                name="description"
                value={entry.description}
                onChange={handleChange}
                placeholder="Description of the work done"
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default TimeEntryForm;
