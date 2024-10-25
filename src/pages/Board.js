import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Droppable } from '../components/index';
import './board.css'
import { getAllTasks, editTaskStatus } from '../services/apiService';

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
        if (over) {
            const draggedTaskId = active.id;
            const columnStatus = over.id;

            tasks.map((task) => {
                if (task._id === draggedTaskId) {
                    editTaskStatus(columnStatus, draggedTaskId)
                    initializeTasks()
                }
            })
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
