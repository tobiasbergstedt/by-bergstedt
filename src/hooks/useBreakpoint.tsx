import { useState, useEffect } from "react";
// import throttle from "lodash.throttle";

export const MOBILE = "mobile";
export const TABLET_PORTRAIT = "tablet-portrait";
export const TABLET_LANDSCAPE = "tablet-landscape";
export const DESKTOP = "desktop";

const tabletPortrait = 768;
const desktop = 1024;

export const getBreakpointsConfig = (
  width: number,
  height: number,
): string | undefined => {
  if (width < tabletPortrait) {
    return MOBILE;
  }

  if (width >= tabletPortrait && width < desktop) {
    if (height < width) {
      return TABLET_LANDSCAPE;
    }
    return TABLET_PORTRAIT;
  }

  if (width >= desktop) {
    return DESKTOP;
  }
};

const useBreakpoint = (): any => {
  const [breakpoint, setBreakpoint] = useState<any>(() => {
    if (typeof window !== "undefined") {
      getBreakpointsConfig(window.innerWidth, window.innerHeight);
    }
  });

  useEffect(() => {
    // Set initial breakpoint
    setBreakpoint(getBreakpointsConfig(window.innerWidth, window.innerHeight));
    const onResize = (): void => {
      setBreakpoint(
        getBreakpointsConfig(window.innerWidth, window.innerHeight),
      );
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return breakpoint;
};

export default useBreakpoint;
