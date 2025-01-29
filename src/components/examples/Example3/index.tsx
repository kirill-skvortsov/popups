import { closePopup, openPopup } from "../../popups";

import { Example3Popup } from "./Popup";

export const Example3 = () => {
  const handleOpen = () => openPopup(Example3Popup);

  const handleClose = () => closePopup(Example3Popup);

  return (
    <div>
      <button onClick={handleOpen}>Open example 3</button>
      <button onClick={handleClose}>Close example 3</button>
    </div>
  );
};
