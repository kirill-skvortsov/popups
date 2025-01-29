import { closePopup, openPopup } from "../../popups";

import { Example1Popup } from "./Popup";

// Can be used outside of React components
const handleOpen = () => openPopup(Example1Popup, { someProp: "Some value 1" });

// Can be used outside of React components
const handleClose = () => closePopup(Example1Popup);

export const Example1 = () => {
  return (
    <div>
      <button onClick={handleOpen}>Open example 1</button>
      <button onClick={handleClose}>Close example 1</button>
    </div>
  );
};
