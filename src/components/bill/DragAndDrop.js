import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './DragAndDrop.scss';
import DragItem from './DragItem';

export default function DragAndDrop({ itemsToRender, tableInfo }) {
  const [itemsOnBill, setItemsOnBill] = useState([...itemsToRender]);
  const [columns, setColumns] = useState([]);

  const initialColumnState = [];

  for (let i = 1; i < tableInfo.seats; i++) {
    initialColumnState.push({ id: i, title: `Seat ${i}`, items: [] });
    itemsOnBill.forEach((item) => {
      if (item.seat === i) {
        console.log(initialColumnState);
        initialColumnState[i - 1].items.push(item);
      }
    });
  }

  useEffect(() => {
    setItemsOnBill([...itemsToRender]);
    setColumns([...initialColumnState]);
  }, [itemsToRender]);
  console.log(itemsOnBill);

  console.log(columns);
  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!result.destination) return;
    const items = Array.from(itemsOnBill);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setItemsOnBill(items);

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // if (itemsToRender[selected]) {
    //   const upData = {
    //     seat: seat,
    //     item: itemsToRender[selected].orderItemId,
    //   };
    //   updateBill(tableInfo, upData);

    //   // if selected is in the items that aren't sent
    //   if (selected >= bill.items.length)
    //     unpaidItems[selected - bill.items.length].seat_number = seat;
    //   itemsToRender[selected].seat = seat;
    // }
  };
  console.log(columns);
  const draggableItemsToRender = itemsOnBill.map((item, index) => {
    return (
      <div className="draggable-container">
        <Draggable key={index} draggableId={index.toString()} index={index}>
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
  });
  console.log(columns);
  const droppableAreas = columns.map((item, index) => {
    return (
      <Droppable droppableId={`seat-1`} key={index}>
        {(provided) => (
          <div className="droppable-container">
            <h1>{`Seat ${index}`}</h1>
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {draggableItemsToRender}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
    );
  });

  console.log(droppableAreas);
  return (
    <div className="dragAndDropContainer">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="droppable-container">{droppableAreas}</div>
      </DragDropContext>
    </div>
  );
}
