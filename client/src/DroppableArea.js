import React from 'react';
import { useDrop } from 'react-dnd';
import { useState } from 'react';


// const DroppableArea = () => {
const DroppableArea = ({ onTextDrop, language }) => {
    // State to hold the dropped text
    const [droppedText, setDroppedText] = useState('');

    // Setting up the drop target
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TEXT', // Accepts only items of type 'TEXT'
        drop: (item, monitor) => {
            // Function to handle the dropped item
            const textToDrop = item.text[language];

            if (onTextDrop) {
                onTextDrop(textToDrop); // Call the passed function with the dropped text
            }
            setDroppedText(prevText => prevText + textToDrop + ' '); // Append dropped text
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(), // Indicates if an item is hovering over the area
        }),
    }), [language]);

    // Styling for the droppable area
    const areaStyle = {
        border: '1px dashed grey',
        fontAlign: 'center',
        fontSize: '50px',
        padding: '20px',
        // marginTop: '10px',
        // backgroundColor: isOver ? '#f0f0f0' : 'white',
    };

    return (
        <div ref={drop} style={areaStyle}>
            {/* <p>Dropped Text:</p>
            <div>{droppedText}</div> */}
            Drop Text Here...
        </div>
    );
};


export default DroppableArea;
