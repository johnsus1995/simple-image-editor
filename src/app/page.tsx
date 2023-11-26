"use client";

import { Container } from "@/components/dragAndDrop/Container";
import OverlayTextInput from "@/components/utils/OverlayTextInput";
import RangeSlider from "@/components/utils/RangeSlider";
import Thumbnail from "@/components/utils/Thumbnail";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { editSaveImage, saveImage } from "@/redux/image";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useAppDispatch();
  const isEditMode = params.get("id");

  const { images } = useAppSelector(
    state => state.imageSlice,
  );

  const [currentImage, setCurrentImage] = useState("");
  const [imageTitle, setImageTitle] = useState("Untitled");
  const [filter, setFilter] = useState({
    brightness: "1",
    contrast: "1",
    saturation: "1",
    sepia: "0",
    blackAndWhite: "0",
  });
  const [overlayText, setOverlayText] =
    useState("Image Overlay");

  const [overlays, setOverlays] = useState({
    a: { top: 248, left: 169, title: overlayText },
  });

  const onChangeRange = useCallback((e: any) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value,
    }));
  }, []);

  const onClickReset = useCallback(() => {
    setFilter({
      brightness: "1",
      contrast: "1",
      saturation: "1",
      sepia: "0",
      blackAndWhite: "0",
    });
    setOverlays({
      a: { top: 248, left: 169, title: "Image Overlay" },
    });
  }, []);

  const onClickSave = useCallback(() => {
    const image = {
      id: isEditMode ? params.get("id") : uuidv4(),
      src: currentImage,
      metadata: { ...filter, title: imageTitle },
      overlay: {
        top: overlays.a.top,
        left: overlays.a.left,
        title: overlayText,
      },
    };
    if (isEditMode) {
      dispatch(editSaveImage(image));
      toast.success("Image updated.");
      onClickReset();
      return;
    }
    dispatch(saveImage(image));
    toast.success("Image Saved.");
    onClickReset();
  }, [
    currentImage,
    dispatch,
    filter,
    imageTitle,
    isEditMode,
    onClickReset,
    overlayText,
    overlays.a.left,
    overlays.a.top,
    params,
  ]);

  const onSelectImage = useCallback(
    (img: any) => {
      router.push(`/?id=${img.id}`);
      setCurrentImage(img.src);
      setFilter(img.metadata);
      setOverlays({ a: img.overlay });
      setOverlayText(img.overlay.title);
      setImageTitle(img?.metadata?.title || "");
    },
    [router],
  );

  const getRandomImage = useCallback(async () => {
    router.push("/");
    try {
      await fetch(
        "https://source.unsplash.com/random",
      ).then(({ url }) => {
        setCurrentImage(url);
      });
    } catch (error) {
      toast.error(
        "Failed to load image, please try again.",
      );
    }
  }, [router]);

  useEffect(() => {
    getRandomImage();
  }, [getRandomImage]);

  return (
    <main className="flex flex-col md:flex-row">
      <div className="w-full px-10 pt-10 md:w-1/2">
        <div className="flex items-center justify-between">
          <input
            className="w-[150px] rounded-md border border-gray-300 px-6 py-1"
            placeholder="Image name"
            value={imageTitle}
            onChange={e => setImageTitle(e.target.value)}
          />

          <button
            className="rounded-md bg-[#005CC8]  px-4 py-1 text-white"
            onClick={getRandomImage}
          >
            New
          </button>
        </div>

        <div className="mt-10 flex justify-center">
          <DndProvider backend={HTML5Backend}>
            <Container
              hideSourceOnDrag
              currentImage={currentImage}
              imageFilter={filter}
              boxes={overlays}
              setBoxes={setOverlays}
              overlayText={overlayText}
            />
          </DndProvider>
        </div>

        <button
          className="ml-auto mt-10 block rounded-md bg-[#005CC8] px-4 py-1 text-white"
          onClick={onClickSave}
        >
          Save
        </button>

        {!!images.length && (
          <div className="mb-10 mt-10 md:mb-0">
            <h1 className="text font-bold">
              Recent Images
            </h1>
            <div className="mt-5 flex flex-row flex-wrap gap-2">
              {images?.map(image => (
                <div
                  key={image?.id}
                  onClick={() => onSelectImage(image)}
                  className="cursor-pointer"
                >
                  <Thumbnail image={image} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="h-screen w-full bg-[#E6E6E6] px-10 pt-10 md:w-1/2">
        <div className="mb-10 flex justify-between">
          <h1>Filter</h1>
          <span
            className="cursor-pointer text-[#005CC8] underline"
            onClick={onClickReset}
          >
            Reset
          </span>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <RangeSlider
            name="brightness"
            sliderTitle="Brightness"
            value={filter.brightness}
            onChange={onChangeRange}
          />
          <RangeSlider
            name="saturation"
            sliderTitle="Saturate"
            value={filter.saturation}
            onChange={onChangeRange}
          />
          <RangeSlider
            name="contrast"
            sliderTitle="Contrast"
            value={filter.contrast}
            onChange={onChangeRange}
          />
          <RangeSlider
            name="sepia"
            sliderTitle="Sepia"
            value={filter.sepia}
            onChange={onChangeRange}
          />
          <RangeSlider
            name="blackAndWhite"
            sliderTitle="Black/White"
            value={filter.blackAndWhite}
            onChange={onChangeRange}
          />
        </div>
        <div className="max-w-[200px]">
          <OverlayTextInput
            value={overlayText}
            onChange={setOverlayText}
          />
        </div>
      </div>
    </main>
  );
}
