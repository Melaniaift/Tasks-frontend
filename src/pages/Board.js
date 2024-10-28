import React, { useState, useEffect } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { Droppable, Draggable } from '../components/index';
import './board.css'
import { getAllTasks, editTaskStatus } from '../services/apiService';

export const Board = () => {

    const [tasks, setTasks] = useState([]);
    const allowedStatuses = ['new', 'progress', 'testing', 'done'];

    const [activeId, setActiveId] = useState(null);
    const activeTask = tasks.find(task => task._id === activeId);

    useEffect(() => {
        initializeTasks();
    }, []);

    const handleDragStart = (event) => {
        console.error(event)
        setActiveId(event.active.id);
    };

    async function initializeTasks() {
        try {
            const fetchedTasks = await getAllTasks();
            setTasks(fetchedTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    const handleDragEnd = (event) => {
        console.error(event)
        const { over, active } = event;
        
        if (over) {
            const draggedTaskId = active.id;
            const columnStatus = over.id;

            tasks.forEach((task) => {
                if (task._id === draggedTaskId) {
                    editTaskStatus(columnStatus, draggedTaskId)
                    initializeTasks()
                }
            })
        }
        setActiveId(null);
    }

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <div className="board-container">
                {allowedStatuses.map((status) => (
                    <Droppable key={status} id={status} tasks={tasks.filter(task => task._id !== activeId)}>
                    </Droppable>
                ))}
            </div>
            <DragOverlay>
                {activeTask ? (
                    <Draggable id={activeTask._id} key={activeTask._id} task={activeTask} isOverlay={true} />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
