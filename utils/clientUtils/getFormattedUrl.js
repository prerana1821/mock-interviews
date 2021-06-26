export const formatedUrl = (url) => {
  const formatedUrl = url
    .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
    .split("/")[0];
  return formatedUrl;
};
