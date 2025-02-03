import { closePopup, openPopup, Popup } from "../../popups";
import { Example3NestedPopup } from "./NestedPopup";

export const Example3Popup: Popup = () => {
  return (
    <div style={{ padding: 20, border: "1px solid black" }}>
      <h1>Example 3</h1>

      <button onClick={() => openPopup(Example3NestedPopup)}>
        Open nested popup
      </button>
      <button onClick={() => closePopup(Example3Popup)}>Close</button>
    </div>
  );
};
