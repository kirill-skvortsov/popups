import { closePopup, createPopup } from "../../popups";

type Props = {
  someProp: string;
};

type Resolve = {
  data: number;
};

// Wrap all popups in createPopup HoC
export const Example2Popup = createPopup<Props, Resolve>(({ someProp }) => {
  const handleCloseWithProps = () => closePopup(Example2Popup, { data: 42 });

  const handleClose = () => closePopup(Example2Popup);

  return (
    <div style={{ padding: 20, border: "1px solid black" }}>
      <h1>Example 2</h1>
      <p>{someProp}</p>
      <button onClick={handleCloseWithProps}>Close with some props</button>
      <button onClick={handleClose}>Close without props</button>
    </div>
  );
});
