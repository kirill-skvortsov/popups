import { awaitPopup, closePopup } from "../../popups";
import { Example2Popup } from "./Popup";

// Wrap all popups in createPopup HoC
export const Example2 = () => {
  const handleOpen = async () => {
    const data = await awaitPopup(Example2Popup, { someProp: "Some value 2" });
    if (!data) {
      console.log("Popup was closed without data");
      return;
    }

    console.log(`Received data: ${JSON.stringify(data)}`);
  };

  const handleClose = () => closePopup(Example2Popup);

  return (
    <div>
      <button onClick={handleOpen}>Open example 2</button>
      <button onClick={handleClose}>Close example 2</button>
    </div>
  );
};
