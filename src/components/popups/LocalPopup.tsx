import type { IsNever, Popup } from "./types";
import { useLocalPopup } from "./hooks/useLocalPopup";

type LocalPopupProps<Props, Resolve> = {
  popup: Popup<Props, Resolve>;
} & (IsNever<Props> extends true
  ? // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    {}
  : Partial<{
      [Key in keyof Props]: Props[Key];
    }>);

export const LocalPopup = <Props, Resolve>({
  popup,
  ...additionalProps
}: LocalPopupProps<Props, Resolve>) => {
  const localPopup = useLocalPopup(popup);
  if (!localPopup) {
    return null;
  }

  const { Component, props } = localPopup;
  return <Component {...props} {...additionalProps} />;
};
