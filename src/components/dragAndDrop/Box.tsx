"use client";

import { useDrag } from "react-dnd";

const style = {
  position: "absolute",
  border: "1px dashed gray",
  backgroundColor: "",
  padding: "0",
  cursor: "move",
  color:"white",
};

const ItemTypes = {
  BOX: "box",
};

export const Box = ({
  id,
  left,
  top,
  hideSourceOnDrag,
  children,
}: any) => {
    
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  );
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <div
      className="box"
      ref={drag}
      style={{ ...style, left, top } as any}
      data-testid="box"
    >
      {children}
    </div>
  );
};
