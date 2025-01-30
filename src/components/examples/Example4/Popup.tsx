import { useContext } from "react";

import { closePopup, createPopup } from "../../popups";
import { Context } from "./context";

type Props = {
  name: string;
};

// Wrap all popups in createPopup HoC
export const Example4Popup = createPopup<Props>(({ name }) => {
  const context = useContext(Context);

  return (
    <div style={{ padding: 20, border: "1px solid black" }}>
      <h1>Example 4</h1>
      <p>Prop name: {name}</p>
      <p>Context value: {context}</p>

      <button onClick={() => closePopup(Example4Popup)}>Close</button>
    </div>
  );
});
