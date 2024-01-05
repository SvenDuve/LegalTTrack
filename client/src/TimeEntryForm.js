// TimeEntryForm.js
import React, { useState, useEffect } from 'react';
// Add this import to your TimeEntryForm.js
import './TimeEntryForm.css';
import { useDrag, useDrop, DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableText from './DraggableText';
import DroppableArea from './DroppableArea';
import { type } from '@testing-library/user-event/dist/type';
// import { response } from 'express';



function TimeEntryForm() {
    const [entry, setEntry] = useState({
        pid: '',
        client: '',
        department: '',
        project: '',
        counterparty: '',
        start_time: '',
        end_time: '',
        description: ''
    });

    const [language, setLanguage] = useState('en'); // default language is English
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const switchLanguage = () => {
        setLanguage(prevLang => prevLang === 'en' ? 'de' : 'en');
    };

    // Method to handle text drop
    const handleTextDrop = (text) => {

        setEntry(prevEntry => ({
            ...prevEntry,
            description: prevEntry.description + text + ' '
        }));
    };

    const [pidOptions, setPidOptions] = useState([{ value: 'pid1', label: 'MID' }, { value: 'pid2', label: 'LUD' }]);
    // const [clientOptions, setClientOptions] = useState([{ value: 'client1', label: 'RWE' }, { value: 'client2', label: 'JPMorgan' }]);
    const [clientOptions, setClientOptions] = useState([]);
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [projectOptions, setProjectOptions] = useState([]);
    const [counterpartyOptions, setCounterpartyOptions] = useState([]);
    const [entries, setEntries] = useState([]);

    

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
        const allFieldsFilled = Object.values(entry).every(field => field !== '');
        console.log(allFieldsFilled);
        // Here you would typically send this data to the backend
        // and then clear the form fields
        if (entry.id) {
            updateEntry(entry); // Function to send PUT request
        } else {
            addTimeEntry(entry); // Existing function to add a new entry
        }
        // addTimeEntry(entry)
        setEntry({
            pid: '',
            client: '',
            department: '',
            project: '',
            counterparty: '',
            startTime: '',
            endTime: '',
            description: ''
        });


        // Well use this when live
        // if (allFieldsFilled) {
        //     console.log(entry); // Log the current values
        //     // Here you would typically send this data to the backend
        //     // and then clear the form fields
        //     setEntry({
        //         pid: '',
        //         client: '',
        //         department: '',
        //         project: '',
        //         counterparty: '',
        //         startTime: '',
        //         endTime: '',
        //         description: ''
        //     });
        // } else {
        //     alert('Please fill all fields before submitting.');
        // }
    };


    useEffect(() => {

        fetch('/api/clients')
        .then(response => response.json())
        .then(data => {
            // Assuming data is an array of clients
            setClientOptions(data.map(client => ({ value: client.value, label: client.label })));
        })
        .catch(error => {
            console.error('Error fetching clients:', error);
        });
        
        console.log(entry.client);
        if (entry.client) {

            fetch(`/api/departments/${entry.client}`)
            .then(response => response.json())
            .then(data => setDepartmentOptions(data.map(dept => ({ value: dept, label: dept }))))   

            fetch(`/api/projects/${entry.client}`)
            .then(response => response.json())
            .then(data => setProjectOptions(data.map(project => ({ value: project, label: project }))))   

            fetch('/api/counterparties')
            .then(response => response.json())
            .then(data => setCounterpartyOptions(data.map(cpty => ({ value: cpty.value, label: cpty.label }))))
                   
        } else {
            setDepartmentOptions([]);
            setProjectOptions([]);
            setCounterpartyOptions([]);
        }
    }, [entry.client]);


    useEffect(() => {
        setLoading(true);
        fetch('/api/time-entries')
            .then(response => response.json())
            // .then(data => setEntries(Object.values(data)[1]))
            .then(data => setEntries(data.entries))
    }, [entry.client]);
    
    useEffect(() => {
        // console.log(entries.map(entry => entry.start_time));
        console.log(entries);
    }, [entries]);

 

    const addTimeEntry = async (data) => {
        try {
            const response = await fetch('/api/add-entry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log('Entry added successfully:', result);
        } catch (error) {
            console.error('Error adding entry:', error);
        }
    };
    

    // const fetchData = async (pageNumber = 1, filters = {}) => {
    //     // Construct the query string based on pagination and filters
    //     const query = new URLSearchParams({ page: pageNumber, ...filters }).toString();
    //     const response = await fetch(`/api/time-entries?${query}`);
    //     const data = await response.json();
    //     return data;
    // };
    
    const editEntry = (entry) => {
        setEntry(entry);
        // Scroll to the form or open a modal for editing
    };

    const populateFormForEdit = (entry) => {
        setEntry(entry); // This assumes the structure of 'entry' matches your state
        // Optionally, scroll to the form or handle UI changes
    };

    const updateEntry = async (updatedEntry) => {
        try {
            const response = await fetch(`/api/time-entries/${updatedEntry.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEntry)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Handle the response, such as updating the 'entries' state to reflect changes
            // This might involve re-fetching entries or updating the specific entry in the state
        } catch (error) {
            console.error('Error updating entry:', error);
        }
    };
    

    const deleteEntry = async (id) => {
        // Call API to delete the entry
        // Remove the entry from the 'entries' state or refetch the entries
        try {
            const response = await fetch(`/api/time-entries/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Remove the deleted entry from the state to update the UI
            setEntries(entries.filter(entry => entry.id !== id));
        } catch (error) {
            console.error('Error deleting entry:', error);
        }
    };
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Europe/Berlin' };
        const date = new Date(dateString);
        if (isNaN(date)) {
            console.error('Invalid date:', dateString);
            return 'Invalid Date';
        }
        return date.toLocaleDateString('de-DE', options);
    };

    const dragItems = [
        {en: 'Review and Mark-up Draft from Client', de: 'Durchsicht und Überarbeitung des Vertragsentwurfs des Kunden'},
        {en: 'Review and Mark-up Draft received from Counterparty', de: 'Durchsicht und Überarbeitung des Vertragsentwurfs der Gegenpartei'},
        {en: 'Drafting Response to Client', de: 'Entwurf Antwort an Kunden'},
        {en: 'Drafting Response to Counterparty', de: 'Entwurf Antwort an Gegenpartei'},
    ]; // Example draggable items


    return (
        <DndProvider backend={HTML5Backend}>
        <header> DLC Time Entry Table </header>
            <form className='mainForm' onSubmit={handleSubmit}>
                {/* <button type="button" onClick={switchLanguage}>Switch Language</button> */}
                    <div className='user-input'>
                    <label htmlFor="pid">PID</label>
                    <select id="pid" type="text" name="pid" value={entry.pid} onChange={handleChange}>
                        <option value="">Select PID</option>
                        {pidOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                    </select>
                    <label htmlFor="client">Client</label>
                    <select id="client" type="text" name="client" value={entry.client} onChange={handleChange}>
                        <option value="">Select Client</option>
                        {clientOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                    </select>
                    <label htmlFor="department">Department</label>
                    <select id= "department" name="department" value={entry.department} onChange={handleChange}>
                        <option value="">Select Client first</option>
                        {departmentOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                    </select>
                    <label htmlFor="project">Project</label>
                    <select id= "project" name="project" value={entry.project} onChange={handleChange}>
                        <option value="">Select Client first</option>
                        {projectOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                    </select>
                    <label htmlFor="counterparty">Counterparty</label>
                    <select id= "counterparty" name="counterparty" value={entry.counterparty} onChange={handleChange}>
                        <option value="">Select Client first</option>
                        {counterpartyOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <label htmlFor="startTime">Start Time</label>
                    <input
                        id="startTime"
                        type="datetime-local"
                        name="start_time"
                        value={entry.start_time}
                        onChange={handleChange}
                    />
                    <label htmlFor="endTime">End Time</label>
                    <input
                        id="endTime"
                        type="datetime-local"
                        name="end_time"
                        value={entry.end_time}
                        onChange={handleChange}
                    />
                </div>
                <div className='area'>                    
                    <div className="area-drag">
                        {dragItems.map((item, index) => (
                            <DraggableText key={index} item={item} language={language} />
                            ))}
                    </div>
                    <div className='area-drop'>
                        <DroppableArea onTextDrop={handleTextDrop} language={language} />
                    </div>
                </div>
                <div className='area'>
                    <div className='area-text'>
                        <textarea
                            name="description"
                            value={entry.description}
                            onChange={handleChange}
                            placeholder="Description of the work done"
                            />
                        </div>
                    <div className='area-button'>
                        <button className='submit-button' type="submit">Submit</button>
                        <button type="button" onClick={switchLanguage}>Switch Language</button>
                    </div>
                </div>
            </form>
            <table className='data-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>PID</th>
                        <th>Client</th>
                        <th>Department</th>
                        <th>Project</th>
                        <th>Counterparty</th>
                        <th>Description</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map(entry => (
                        <tr key={entry.id}>
                            <td>{entry.id}</td>
                            <td>{entry.pid}</td>
                            <td>{entry.client}</td>
                            <td>{entry.department}</td>
                            <td>{entry.project}</td>
                            <td>{entry.counterparty}</td>
                            <td>{entry.description}</td>
                            <td>{formatDate(entry.start_time)}</td>
                            {/* <td>{entry.start_time}</td> */}
                            <td>{formatDate(entry.end_time)}</td>
                            {/* <td>{entry.end_time}</td> */}
                            <td>
                                <button onClick={() => populateFormForEdit(entry)}>Edit</button>
                                <button onClick={() => deleteEntry(entry.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </DndProvider>
    );
}

export default TimeEntryForm;
