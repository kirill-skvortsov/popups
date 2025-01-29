import { closePopup, createPopup } from "../../popups";

type Props = {
  someProp: string;
};

// Wrap all popups in createPopup HoC
export const Example1Popup = createPopup<Props>(({ someProp }) => {
  return (
    <div style={{ padding: 20, border: "1px solid black" }}>
      <h1>Example 1</h1>
      <p>{someProp}</p>

      <button onClick={() => closePopup(Example1Popup)}>Close</button>
    </div>
  );
});
