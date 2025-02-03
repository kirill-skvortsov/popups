import { useContext } from "react";

import { closePopup, Popup } from "../../popups";
import { Context } from "./context";

type Props = {
  name: string;
};

export const Example4Popup: Popup<Props> = ({ name }) => {
  const context = useContext(Context);

  return (
    <div style={{ padding: 20, border: "1px solid black" }}>
      <h1>Example 4</h1>
      <p>Prop name: {name}</p>
      <p>Context value: {context}</p>

      <button onClick={() => closePopup(Example4Popup)}>Close</button>
    </div>
  );
};
