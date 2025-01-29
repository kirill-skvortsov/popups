import type { FC } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Popup<Props = never, _Resolve = never> = FC<Props> & {
  key: string;
};
