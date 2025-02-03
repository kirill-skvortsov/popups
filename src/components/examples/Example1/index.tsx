import { closePopup, openPopup } from "../../popups";

import { Example1Popup } from "./Popup";

const handleOpen = () => openPopup(Example1Popup, { someProp: "Some value 1" });

const handleClose = () => closePopup(Example1Popup);

export const Example1 = () => {
  return (
    <div>
      <button onClick={handleOpen}>Open example 1</button>
      <button onClick={handleClose}>Close example 1</button>
    </div>
  );
};
