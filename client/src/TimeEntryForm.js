// TimeEntryForm.js
import React, { useState } from 'react';
// Add this import to your TimeEntryForm.js
import './TimeEntryForm.css';
import { useDrag, useDrop, DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './TimeEntryForm.css';
import DraggableText from './DraggableText';
import DroppableArea from './DroppableArea';



function TimeEntryForm() {
    const [entry, setEntry] = useState({
        client: '',
        department: '',
        project: '',
        startTime: '',
        endTime: '',
        description: ''
    });

    // Method to handle text drop
    const handleTextDrop = (text) => {
        setEntry(prevEntry => ({
            ...prevEntry,
            description: prevEntry.description + text + ' '
        }));
    };


    const handleChange = (e) => {
        setEntry({ ...entry, [e.target.name]: e.target.value });
    };
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setEntry(prevEntry => ({ ...prevEntry, [name]: value }));
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(entry);
        // Here you would typically send this data to the backend
        // and then clear the form fields
        // setEntry({
        //     client: '',
        //     department: '',
        //     project: '',
        //     startTime: '',
        //     endTime: '',
        //     description: ''
        // });
    };



    const dragItems = ['Task 1', 'Task 2', 'Task 3']; // Example draggable items


    return (
        <DndProvider backend={HTML5Backend}>
            <div className="drag-items">
                {dragItems.map((item, index) => (
                    <DraggableText key={index} text={item} />
                ))}
            </div>
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
            <DroppableArea onTextDrop={handleTextDrop} />
            <button type="submit">Submit</button>
        </form>
        </DndProvider>
    );
}

export default TimeEntryForm;
