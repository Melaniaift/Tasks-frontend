import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Droppable } from '../components/index';
import './board.css'
import { getAllTasks } from '../services/apiService';

export const Board = () => {

    const [tasks, setTasks] = useState([]);
    const allowedStatuses = ['new', 'progress', 'testing', 'done'];

    useEffect(() => {
        initializeTasks();
    }, []);

    async function initializeTasks() {
        try {
            const fetchedTasks = await getAllTasks();
            setTasks(fetchedTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    function handleDragEnd(event) {
        const { over, active } = event;
        console.error(event)
        if (over) {
            // Find the dragged item
            const draggedTaskId = active.id;
            const newStatus = over.id; // The ID of the container it's dropped on

            // Update the task's status
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === draggedTaskId
                        ? { ...task, status: newStatus } // Update status
                        : task
                )
            );
        }
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="board-container">
                {allowedStatuses.map((status) => (
                    <Droppable key={status} id={status} tasks={tasks}>
                    </Droppable>
                ))}
            </div>
        </DndContext>
    );
}
