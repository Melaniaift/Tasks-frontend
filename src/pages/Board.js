import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from '../components/index';
import { Droppable } from '../components/index';
import './board.css'
import { getAllTasks } from '../services/apiService';

export const Board = () => {

    const tasks = initializeTasks();
    const containers = ['A', 'B', 'C'];
    const [parent, setParent] = useState(null);
    const draggableMarkup = (
        <Draggable id="draggable" className="draggable">Drag me</Draggable>
    );

    async function initializeTasks() {
        try {
            const tasks = await getAllTasks();
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    function handleDragEnd(event) {
        const { over } = event;

        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        setParent(over ? over.id : null);
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="board-container">
                <div>
                    {parent === null ? draggableMarkup : null}
                </div>
                {containers.map((id) => (
                    <Droppable key={id} id={id} className="droppable">
                        {parent === id ? draggableMarkup : 'Drop here'}
                    </Droppable>
                ))}
            </div>

        </DndContext>
    );
}
