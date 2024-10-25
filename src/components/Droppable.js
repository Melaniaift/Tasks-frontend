import { useDroppable } from '@dnd-kit/core';
import './droppable.css'
import { Draggable } from './Draggable';


export const Droppable = (column) => {
    const { isOver, setNodeRef } = useDroppable({
        id: column.id,
    });

    const style = {
        // color: isOver ? 'green' : undefined,
    };

    const capitalizeFirstLetter = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

    return (
        <div ref={setNodeRef} className="default-style" style={style}>
            <h3 className="column-title">{capitalizeFirstLetter(column.id)}</h3>
            <div className="column-content">
                {column.tasks
                    .filter((task) => task.status === column.id)
                    .map((task) => (
                        <Draggable key={task._id} id={task._id} task={task} />
                    ))}
            </div>
        </div>

    );
}
