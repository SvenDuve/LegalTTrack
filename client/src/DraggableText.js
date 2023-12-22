import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableText = ({ text }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TEXT',
        item: { text },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            {text}
        </div>
    );
};

export default DraggableText;
