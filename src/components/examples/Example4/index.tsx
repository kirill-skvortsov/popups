import { closePopup, LocalPopup, openPopup } from "../../popups";
import { Context } from "./context";

import { Example4Popup } from "./Popup";

export const Example4 = () => {
  return (
    <Context.Provider value={123}>
      <div>
        <button onClick={() => openPopup(Example4Popup, { name: "name1" })}>
          Open example 4
        </button>
        <button onClick={() => closePopup(Example4Popup)}>
          Close example 4
        </button>
      </div>

      <LocalPopup popup={Example4Popup} name="name2" />
    </Context.Provider>
  );
};
