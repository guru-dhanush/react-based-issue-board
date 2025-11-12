import React, { FC, ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

type DroppableProps = {
  element?: React.ElementType;
  id: string | number;
  children: ReactNode;
  className?: string;
};

export const Droppable: FC<DroppableProps> = ({
  element: Element = "div",
  id,
  children,
  className,
}) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <Element ref={setNodeRef} className={className}>
      {children}
    </Element>
  );
};
