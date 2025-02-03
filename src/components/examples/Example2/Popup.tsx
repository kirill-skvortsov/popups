import { closePopup, Popup } from "../../popups";

type Props = {
  someProp: string;
};

type Result = {
  data: number;
};

export const Example2Popup: Popup<Props, Result> = ({ someProp }) => {
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
};
