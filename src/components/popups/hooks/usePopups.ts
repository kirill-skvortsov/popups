import { useSyncExternalStore } from "react";

import { popupsStore } from "../store";

export const usePopups = () => {
  const popups = useSyncExternalStore(
    (listener) => popupsStore.subscribe(listener),
    () => popupsStore.getSnapshot()
  );

  return popups;
};
