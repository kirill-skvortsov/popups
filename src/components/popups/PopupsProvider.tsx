import type { FC, ReactNode } from "react";

import { useGlobalPopups } from "./hooks/useGlobalPopups";

type Props = {
  children: ReactNode;
};

export const PopupsProvider: FC<Props> = ({ children }) => {
  const popups = useGlobalPopups();

  return (
    <>
      {children}

      <div id="popups-root">
        {popups.map(({ key, Component, initialProps }) => (
          <Component key={key} {...initialProps} />
        ))}
      </div>
    </>
  );
};
