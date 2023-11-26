import update from "immutability-helper";
import { useCallback } from "react";
import { useDrop } from "react-dnd";
import { Box } from "@/components/dragAndDrop/Box";
import Image from "next/image";

const styles = {
  width: 300,
  height: 300,
  border: "1px solid black",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const ItemTypes = {
  BOX: "box",
};

export const Container = ({
  hideSourceOnDrag,
  currentImage,
  imageFilter,
  boxes,
  setBoxes,
  overlayText,
}: any) => {
  const {
    brightness,
    saturation,
    contrast,
    sepia,
    blackAndWhite,
  } = imageFilter;

  const moveBox = useCallback(
    (id: any, left: any, top: any) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        }),
      );
    },
    [boxes, setBoxes],
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item: any, monitor) {
        const delta: any =
          monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox],
  );

  return (
    <div ref={drop} style={styles as any}>
      {currentImage && (
        <Image
          src={currentImage}
          alt="img"
          height={250}
          width={250}
          style={{
            filter: `brightness(${brightness})
            contrast(${contrast})
            saturate(${saturation})
            sepia(${sepia})
            grayscale(${blackAndWhite}) `,
          }}
          className={` h-[250px] w-[250px]`}
        />
      )}
      {boxes &&
        Object.keys(boxes).map(key => {
          const { left, top } = boxes[key];
          return (
            <Box
              key={key}
              id={key}
              left={left}
              top={top}
              hideSourceOnDrag={hideSourceOnDrag}
            >
              {overlayText}
            </Box>
          );
        })}
    </div>
  );
};
