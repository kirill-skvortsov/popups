import { closePopup, createPopup, closeAllPopups } from "../../popups";

// Wrap all popups in createPopup HoC
export const Example3NestedPopup = createPopup(() => {
  return (
    <div style={{ padding: 20, border: "1px solid black" }}>
      <h1>Example 3 nested popup</h1>

      <button onClick={() => closePopup(Example3NestedPopup)}>Close</button>
      <button onClick={() => closeAllPopups()}>Close all popups</button>
    </div>
  );
});
