import { useState } from "react";
import { DndProvider, useDrag, useDrop, DragSourceMonitor } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FC } from "react";
import Button from "@mui/material/Button";

interface ButtonProps {
  id: number;
  index: number;
  moveButton: (dragIndex: number, hoverIndex: number) => void;
  text: string; // text プロパティを追加
}

const DraggableButton: FC<ButtonProps> = ({ id, text, index, moveButton }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "button",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "button",
    hover(item: ButtonProps, monitor) {
      if (item.id !== id) {
        moveButton(item.index, index);
        item.index = index;
        item.id = id; // 新しい id を設定
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  });

  const isActive = canDrop && isOver;

  return (
    <div
      ref={drop}
      className={`button ${isActive ? "highlight" : ""}`}
      style={{ opacity: isDragging ? 0.5 : 1, margin: "10px 0" }}
    >
      <Button
        variant='contained'
        color='primary'
        size='medium'
        ref={drag}
        className='handle'
      >
        {/* <div ref={drag} className='handle'>
        <svg width='240' height='24' viewBox='0 0 24 24'>
          <path d='M 2.5 11 L 21.5 11 C 21.776142 11 22 11.223858 22 11.5 C 22 11.776142 21.776142 12 21.5 12 L 2.5 12 C 2.223858 12 2 11.776142 2 11.5 C 2 11.223858 2.223858 11 2.5 11 Z M 2.5 16 L 21.5 16 C 21.776142 16 22 16.223858 22 16.5 C 22 16.776142 21.776142 17 21.5 17 L 2.5 17 C 2.223858 17 2 16.776142 2 16.5 C 2 16.223858 2.223858 16 2.5 16 Z'></path>
        </svg>
      </div> */}
        {text}
      </Button>
    </div>
  );
};

const DragComponent: FC = () => {
  const [buttons, setButtons] = useState([
    { id: 1, text: "Button 1" },
    { id: 2, text: "Button 2" },
    { id: 3, text: "Button 3" },
    { id: 4, text: "Button 4" },
  ]);

  const moveButton = (fromIndex: number, toIndex: number) => {
    const newButtons = [...buttons];
    const [removed] = newButtons.splice(fromIndex, 1);
    newButtons.splice(toIndex, 0, removed);
    setButtons(newButtons);
  };

  return (
    <div className='container'>
      <h1>Drag and Drop Buttons</h1>
      <DndProvider backend={HTML5Backend}>
        <div className='buttons'>
          {buttons.map((button, index) => (
            <DraggableButton
              key={button.id}
              id={button.id}
              index={index}
              moveButton={moveButton}
              text={button.text}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default DragComponent;
