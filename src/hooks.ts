import { useEffect, useState } from "react";
import { getWindowDimensions } from "./utils";

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export const useOrientation = (): "landscape" | "portrait" => {
  const getOrientation = () =>
    window.matchMedia("(orientation: landscape)").matches
      ? "landscape"
      : "portrait";

  const [orientation, setOrientation] = useState<"landscape" | "portrait">(
    getOrientation()
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(getOrientation());
    };

    window.addEventListener("resize", handleOrientationChange);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  return orientation;
};
