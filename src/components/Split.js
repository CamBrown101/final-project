import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Split.scss';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

export default function Split(props) {
  const items = props.bill.items;
  const itemsWithId = items.map((item, index) => ({
    id: String(index),
    content: item.name,
    price: item.price,
  }));

  // const setCurrentBillState = () => {
  //   newBill = state.map
  // }
  const [state, setState] = useState([itemsWithId]);
  useEffect(() => {
    // console.log(state);
  }, [state]);
  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  }
  const getColumnTotal = (column) => {
    let total = 0;
    for (const each of column) {
      total = total + each.price;
    }
    return total;
  };

  const getTax = (total) => {
    let tax = total * (12 / 100);
    return tax.toFixed(2);
  };

  const getSubtotal = (total) => {
    let subTotal = parseFloat(total) + parseFloat(getTax(total));
    return subTotal.toFixed(2);
  };

  return (
    <div className="split-div">
      <button
        className="split-bill-button"
        type="button"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Split Bill
      </button>

      <div style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-around',
                            }}
                          >
                            {item.content}
                            <br />
                            {`$ ${item.price}.00`}
                            <button
                              type="button"
                              onClick={() => {
                                const newState = [...state];
                                newState[ind].splice(index, 1);
                                setState(
                                  newState.filter((group) => group.length)
                                );
                              }}
                            >
                              delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                  <div className="totals-div">
                    <h1 className="split-total">
                      Total: ${getColumnTotal(el)}.00
                      <br />
                      Tax: ${getTax(getColumnTotal(el))}
                      <br />
                      Subtotal: ${getSubtotal(getColumnTotal(el))}
                    </h1>
                  </div>
                  <button
                    className="pay-split-bill-button"
                    type="button"
                    onClick={() => {
                      const newState = [...state];
                      newState.splice(ind, 1);
                      setState(newState);
                      const newBill = state.flat().map((item, index) => ({
                        id: index,
                        name: item.content,
                        price: item.price,
                      }));
                      props.setBill({
                        ...props.bill,
                        items: newBill,
                      });
                    }}
                  >
                    Print Bill
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
