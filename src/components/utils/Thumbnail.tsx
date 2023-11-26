import React from "react";
import Image from "next/image";

const Thumbnail = (props: any) => {
  const { image } = props;
  const {
    brightness,
    saturation,
    contrast,
    sepia,
    blackAndWhite,
  } = image.metadata;
  return (
    <div className="flex flex-col">
      <Image
        src={image?.src}
        alt="thumbnail"
        width={150}
        height={100}
        className="max-h-[100px] min-h-[100px] min-w-[150px]"
        style={{
          filter: `brightness(${brightness})
        contrast(${contrast})
        saturate(${saturation})
        sepia(${sepia})
        grayscale(${blackAndWhite}) `,
        }}
      />
      <p>{image?.metadata?.title}</p>
    </div>
  );
};

export default Thumbnail;
