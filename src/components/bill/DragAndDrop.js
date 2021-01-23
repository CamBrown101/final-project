import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './DragAndDrop.scss';
import { updateBill } from './BillHelpers';

export default function DragAndDrop({ itemsToRender, tableInfo, bill }) {
  const [itemsOnBill, setItemsOnBill] = useState([...itemsToRender]);
  const [columns, setColumns] = useState([]);

  const initialColumnState = [];

  for (let i = 0; i < tableInfo.seats; i++) {
    initialColumnState.push({ id: i, title: `Seat ${i}`, items: [] });
    itemsOnBill.forEach((item) => {
      if (item.seat === i) {
        initialColumnState[i - 1].items.push(item);
      }
    });
  }
  useEffect(() => {
    setItemsOnBill([...itemsToRender]);
    setColumns([...initialColumnState]);
  }, [bill, tableInfo]);

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!result.destination) return;
    const items = [...itemsOnBill];
    const [reorderedItem] = items.splice(result.source.index, 1);
    reorderedItem.seat = parseInt(destination.droppableId) + 1;
    items.splice(result.destination.index, 0, reorderedItem);
    setItemsOnBill(items);

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const upData = {
      seat: parseInt(destination.droppableId) + 1,
      item: reorderedItem.orderItemId,
    };
    updateBill(tableInfo, upData);
    setColumns([...initialColumnState]);
    console.log(columns[parseInt(destination.droppableId)]);
  };
  const droppableAreas = columns.map((item, index) => {
    return (
      <Droppable
        droppableId={`${index}`}
        key={`${item.id + index}`}
        seatNumber={index + 1}>
        {(provided) => (
          <div className="droppable-container">
            <h1>{`Seat ${index + 1}`}</h1>
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {itemsOnBill.map((item, innerId) => {
                if (item.seat === index + 1)
                  return (
                    <div className="draggable-container">
                      <Draggable
                        key={innerId}
                        draggableId={
                          index.toString() +
                          item.name.toString() +
                          innerId.toString()
                        }
                        index={innerId}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <div className="drag-item">
                              <p>{`${item.seat} ${item.name} ${item.price} ${item.orderItemId} ${item.seat}`}</p>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    </div>
                  );
              })}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
    );
  });

  return (
    <div className="dragAndDropContainer">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="droppable-container">{droppableAreas}</div>
      </DragDropContext>
    </div>
  );
}
