import React from "react";
import Image from "next/image";
import CcIcon from "@/../public/images/cc.png";

const OverlayTextInput = (props: any) => {
  const { value, onChange } = props;
  return (
    <div>
      <div className="mb-2 flex gap-2">
        <Image
          src={CcIcon}
          alt="cc"
          width={24}
          height={24}
        />
        <p className="font-bold">Text</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-semibold">Content</p>
        <input
          type="text"
          className="rounded border border-gray-300 bg-white py-2 pl-2"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default OverlayTextInput;
