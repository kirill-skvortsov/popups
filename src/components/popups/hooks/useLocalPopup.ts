import { useEffect } from "react";

import { usePopups } from "./usePopups";
import type { Popup } from "../types";
import { makeLocal } from "../store";

export const useLocalPopup = <Props, Result>(popup: Popup<Props, Result>) => {
  const popups = usePopups();
  const localPopup = popups.find(({ Component }) => Component === popup);

  useEffect(() => {
    const cleanup = makeLocal(popup);
    return cleanup;
  }, [popup]);

  return localPopup ?? null;
};
