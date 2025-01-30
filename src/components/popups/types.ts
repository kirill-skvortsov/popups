import type { FC } from "react";

export type IsNever<T> = [T] extends [never] ? true : false;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Popup<Props = never, _Resolve = never> = FC<Props> & {
  key: string;
};
