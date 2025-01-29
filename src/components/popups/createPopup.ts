import type { FC } from "react";

import type { Popup } from "./types";

export function createPopup<Props = never>(Component: FC<Props>): Popup<Props>;
export function createPopup<Props, Resolve>(
  Component: FC<Props>
): Popup<Props, Resolve>;
export function createPopup<Props, Resolve>(
  Component: FC<Props>
): Popup<Props, Resolve> {
  const PopupComponent = Component as Popup<Props, Resolve>;
  // Could be replaced with a more sophisticated key generator
  PopupComponent.key = crypto.randomUUID();
  return PopupComponent;
}
