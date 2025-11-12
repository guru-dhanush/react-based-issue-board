import React, { FC, ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import classNames from "classnames";

type DraggableProps = {
  element?: React.ElementType;
  id: string | number;
  children: ReactNode;
  draggable?: boolean;
  className?: string;
  data?: any;
  onClick?: (id: any) => void;
};

export const Draggable: FC<DraggableProps> = ({
  element: Element = "div",
  id,
  children,
  draggable = true,
  className,
  data,
  onClick,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled: !draggable,
      data,
    });

  const transformStyle = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : {};

  const handleClick = (e: React.MouseEvent) => {
    if (!isDragging && onClick) {
      e.stopPropagation();
      onClick(id);
    }
  };

  const classes = classNames(className, {
    "card-dragging": isDragging,
  });

  return (
    <Element
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={transformStyle}
      className={classes}
      onClick={handleClick}
    >
      {children}
    </Element>
  );
};
