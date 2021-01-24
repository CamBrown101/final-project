import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./DragAndDrop.scss";
import { updateBill } from "./BillHelpers";
import Axios from "axios";

export default function DragAndDrop({
  itemsToRender,
  tableInfo,
  bill,
  setTable,
}) {
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
    //eslint-disable-next-line
  }, [bill, tableInfo]);

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
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
    console.log(columns[parseInt(destination.droppableId)]);

    const newItems = [];
    Axios.get(`/api/orders/${tableInfo.orderId}/items`).then((res) => {
      newItems.push(res.data);
      setTable({
        ...tableInfo,
        items: newItems,
      });
    });
  };
  const droppableAreas = columns.map((item, index) => {
    return (
      <Droppable
        droppableId={`${index}`}
        key={`${item.id}${index}`}
        seatNumber={index + 1}
      >
        {(provided) => (
          <div className="droppable-container">
            <h1>{`Seat ${index + 1}`}</h1>
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {/*eslint-disable-next-line*/}
              {itemsOnBill.map((item, innerId) => {
                if (item.seat === index + 1)
                  return (
                    <div key={innerId} className="draggable-container">
                      <Draggable
                        draggableId={
                          index.toString() +
                          item.name.toString() +
                          innerId.toString()
                        }
                        index={innerId}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
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
