export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const getUserAgent = () =>
  typeof window !== "undefined" &&
  window.navigator &&
  window.navigator.userAgent
    ? window.navigator.userAgent
    : undefined;

export const isOnMobileBrowser = (): boolean => {
  const userAgent = getUserAgent();

  if (!userAgent) {
    return false;
  }

  const webMobileRegex = [
    /Android/i,
    /BlackBerry/i,
    /iOS/i,
    /iPhone/i,
    /iPod/i,
    /webOS/i,
    /Windows Phone/i,
  ];

  return webMobileRegex.some((toMatchItem) => userAgent.match(toMatchItem));
};
