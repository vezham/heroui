export const safeText = (text: string, limit = 4, count = 3): string => {
  if (text?.length <= limit) return text;

  return text?.slice(0, count);
};

export const safeAriaLabel = (...texts: any[]): string => {
  let ariaLabel = " ";

  // loop through all texts and return the first non-empty string
  for (const text of texts) {
    if (typeof text === "string" && text.length > 0) {
      ariaLabel = text;
      break;
    }
  }

  return ariaLabel;
};
