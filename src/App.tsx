import { PopupsProvider } from "./components/popups/PopupsProvider";
import { Example1 } from "./components/examples/Example1";
import { Example2 } from "./components/examples/Example2";
import { Example3 } from "./components/examples/Example3";

export const App = () => {
  return (
    <PopupsProvider>
      <Example1 />
      <Example2 />
      <Example3 />
    </PopupsProvider>
  );
};
