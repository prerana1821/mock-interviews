export const formatedUrl = (url: string): string => {
  const formatedUrl = url
    ?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
    .split("/")[0];
  return formatedUrl;
};
