const getColor = (status: string) => {
  switch (status) {
    case "todo":
      return "default";
    case "poc":
      return "default";
    case "dev":
      return "danger";
    case "review":
      return "warning";
    case "completed":
      return "success";
    default:
      return "default";
  }
};

const getVariant = (status: string) => {
  switch (status) {
    case "todo":
      return "bordered";
    case "poc":
      return "bordered";
    case "dev":
      return "flat";
    case "review":
      return "solid";
    case "completed":
      return "dot";
    default:
      return "faded";
  }
};

export {getColor, getVariant};
