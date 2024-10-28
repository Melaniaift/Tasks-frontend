import React, { useState, useEffect } from 'react';
import { closestCenter, DndContext, DragOverlay, rectIntersection } from '@dnd-kit/core';
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
        const { over, active } = event;

        if (over) {
            const draggedTaskId = active.id;
            const columnStatus = over.id;

            const updatedTasks = tasks.map(task => {
                if (task._id === draggedTaskId) {
                    return { ...task, status: columnStatus };
                }
                return task;
            });

            setTasks(updatedTasks);
            editTaskStatus(columnStatus, draggedTaskId)
        }
        setActiveId(null);
    }

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} collisionDetection={closestCenter}>
            <div className="board-container">
                {allowedStatuses.map((status) => (
                    <Droppable key={status} id={status} tasks={tasks.filter(task => task._id !== activeId)}>
                    </Droppable>
                ))}
            </div>
            <DragOverlay>
                {activeId ? (
                    <Draggable id={activeTask._id} key={activeTask._id} task={activeTask} isOverlay={true} />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
