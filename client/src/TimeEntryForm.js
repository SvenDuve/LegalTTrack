// TimeEntryForm.js
import React, { useState, useEffect } from 'react';
// Add this import to your TimeEntryForm.js
import './TimeEntryForm.css';
import { useDrag, useDrop, DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './TimeEntryForm.css';
import DraggableText from './DraggableText';
import DroppableArea from './DroppableArea';



function TimeEntryForm() {
    const [entry, setEntry] = useState({
        pid: '',
        client: '',
        department: '',
        project: '',
        counterparty: '',
        startTime: '',
        endTime: '',
        description: ''
    });

    const [language, setLanguage] = useState('en'); // default language is English


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
    const [clientOptions, setClientOptions] = useState([{ value: 'client1', label: 'RWE' }, { value: 'client2', label: 'JPMorgan' }]);
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [projectOptions, setProjectOptions] = useState([]);
    const [counterpartyOptions, setCounterpartyOptions] = useState([]);

    

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
    };

    const getDepartmentsForClient = (client) => {
        // Returns the departments for the given client
        // In a real app, you might fetch this data from a server
        return allDepartments[client] || [];
    };
    const getProjectsForClient = (client) => {
        // Returns the departments for the given client
        // In a real app, you might fetch this data from a server
        return allProjects[client] || [];
    };
    const getCounterpartiesForClient = (client) => {
        // Returns the departments for the given client
        // In a real app, you might fetch this data from a server
        return allCounterparties[client] || [];
    };



    useEffect(() => {
        if (entry.client) {
            // Implement logic to determine options based on selected client
            const newDepartmentOptions = getDepartmentsForClient(entry.client);
            setDepartmentOptions(newDepartmentOptions.map(dept => ({ value: dept, label: dept })));
            const newProjectsOptions = getProjectsForClient(entry.client);
            setProjectOptions(newProjectsOptions.map(proj => ({ value: proj, label: proj })));
            const newCounterpartyOptions = getCounterpartiesForClient(entry.client);
            setCounterpartyOptions(newCounterpartyOptions.map(cpty => ({ value: cpty, label: cpty })));
        } else {
            setDepartmentOptions([]);
            setProjectOptions([]);
            setCounterpartyOptions([]);
        }
    }, [entry.client]);


    const dragItems = [
        {en: 'Review and Mark-up Draft from Client', de: 'Durchsicht und Überarbeitung des Vertragsentwurfs des Kunden'},
        {en: 'Review and Mark-up Draft received from Counterparty', de: 'Durchsicht und Überarbeitung des Vertragsentwurfs der Gegenpartei'},
        {en: 'Drafting Response to Client', de: 'Entwurf Antwort an Kunden'},
        {en: 'Drafting Response to Counterparty', de: 'Entwurf Antwort an Gegenpartei'},
    ]; // Example draggable items

    const allDepartments = {
        client1: ['FO', 'Rechtsabteilung'],
        client2: ['FO', 'BO'],
        // Add more clients and their departments as needed
    };
    const allProjects = {
        client1: ['Regulatory', 'EFET', 'ISDA'],
        client2: ['EFET', 'Storage Contracts', 'Carbon Credits'],
        // Add more clients and their departments as needed
    };
    const allCounterparties = {
        client1: ['Shell', 'BP', 'Novatek'],
        client2: ['SW Leipzig', 'KoM Solutions', 'Steag'],
        // Add more clients and their departments as needed
    };

    return (
        <DndProvider backend={HTML5Backend}>
        <header> DLC Time Entry Form </header>
            <form className='mainForm' onSubmit={handleSubmit}>
                <button type="button" onClick={switchLanguage}>Switch Language</button>
                    <div className='user-input'>
                    <select type="text" name="pid" value={entry.pid} onChange={handleChange}>
                        <option value="">Select PID</option>
                        {pidOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <select type="text" name="client" value={entry.client} onChange={handleChange}>
                        <option value="">Select Client</option>
                        {clientOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <select name="department" value={entry.department} onChange={handleChange}>
                        <option value="">Select Client first</option>
                        {departmentOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <select name="project" value={entry.project} onChange={handleChange}>
                        <option value="">Select Client first</option>
                        {projectOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <select name="counterparty" value={entry.counterparty} onChange={handleChange}>
                        <option value="">Select Client first</option>
                        {counterpartyOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
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
                    </div>
                </div>
            </form>
        </DndProvider>
    );
}

export default TimeEntryForm;
