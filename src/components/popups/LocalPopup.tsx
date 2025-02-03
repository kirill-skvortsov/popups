import type { IsNever, Popup } from "./types";
import { useLocalPopup } from "./hooks/useLocalPopup";

type LocalPopupProps<Props, Result> = {
  popup: Popup<Props, Result>;
} & (IsNever<Props> extends true
  ? // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    {}
  : Partial<{
      [Key in keyof Props]: Props[Key];
    }>);

export const LocalPopup = <Props, Result>({
  popup,
  ...additionalProps
}: LocalPopupProps<Props, Result>) => {
  const localPopup = useLocalPopup(popup);
  if (!localPopup) {
    return null;
  }

  const { Component, initialProps } = localPopup;
  return <Component {...initialProps} {...additionalProps} />;
};
