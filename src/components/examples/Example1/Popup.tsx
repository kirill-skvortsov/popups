import { closePopup, Popup } from "../../popups";

type Props = {
  someProp: string;
};

export const Example1Popup: Popup<Props> = ({ someProp }) => {
  return (
    <div style={{ padding: 20, border: "1px solid black" }}>
      <h1>Example 1</h1>
      <p>{someProp}</p>

      <button onClick={() => closePopup(Example1Popup)}>Close</button>
    </div>
  );
};
