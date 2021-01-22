import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './DragAndDrop.scss';
import DragItem from './DragItem';

export default function DragAndDrop({ itemsToRender, tableInfo }) {
  const [itemsOnBill, setItemsOnBill] = useState([]);

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

  const [columns, setColumns] = useState(initialColumnState);
  useEffect(() => {
    setItemsOnBill([...itemsToRender]);
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

  return (
    <div className="dragAndDropContainer">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="droppable-container">
          <Droppable droppableId={`seat-1`}>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {draggableItemsToRender}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}
