import { useDraggable } from '@dnd-kit/core';
import './draggable.css'
import { deleteTask } from '../services/apiService'
import { useState, useEffect } from 'react';

export const Draggable = (props) => {

    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = () => setIsDragging(true);
    const handleDragEnd = () => setIsDragging(false);
    const { attributes, listeners, setNodeRef, transform, isDragging: isCurrentlyDragging } = useDraggable({
        id: props.id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : {};

    useEffect(() => {
        setIsDragging(isCurrentlyDragging);
    }, [isCurrentlyDragging]);

    const removeTask = () => {
        deleteTask(props.id)
    }

    return (
        <div className="card-container">
            <div
                ref={setNodeRef}
                style={style}
                {...listeners}
                {...attributes}
                className={`${props.isOverlay ? 'dragging' : ''} max-w-sm p-6 bg-white border border-gray-200 ${!props.isOverlay ? 'rounded-t-lg' : 'rounded-lg'} shadow dark:bg-gray-800 dark:border-gray-700 card-style`}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                draggable
            >
                <h5 className=" font-bold tracking-tight text-gray-900 dark:text-white">{props.task.name}</h5>
                <p className="mb-3 text-xs font-thin text-gray-700 dark:text-gray-400">{props.task.description}</p>
                <div
                    className="inline-flex items-center px-1 py-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {props.task.status}
                </div>
            </div>
            {!isDragging && !props.isOverlay && (
                <button
                    className="delete-button inline-flex items-center px-1 py-1 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    onClick={() => {
                        removeTask(props.id);
                    }}
                >Delete
                </button>
            )}
        </div>
    );
}
