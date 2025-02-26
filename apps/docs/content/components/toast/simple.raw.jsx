import {addToast, Button} from "@vezham/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onPress={() => {
          addToast({
            title: "Success",
            description: "Your changes have been saved successfully.",
          });
        }}
      >
        Show Toast
      </Button>
    </div>
  );
}
