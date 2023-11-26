import React from "react";

const RangeSlider = (props: any) => {
  const { sliderTitle, value, onChange, name } = props;

  return (
    <div className="w-[200px] h-[100px]">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-bold">{sliderTitle}</p>
        <p className="w-fit min-w-[65px] rounded-md border border-gray-300 bg-white px-2 py-1 text-center">
          {(value * 100).toFixed(0)} %
        </p>
      </div>
      <input
        name={name}
        type="range"
        min={"0"}
        max={"2"}
        value={value}
        step="0.01"
        className="w-full outline-none"
        onChange={onChange}
      />
    </div>
  );
};

export default RangeSlider;
