import type { FC, ReactNode } from "react";

import { usePopups } from "./usePopups";

type Props = {
  children: ReactNode;
};

export const PopupsProvider: FC<Props> = ({ children }) => {
  const popups = usePopups();

  return (
    <>
      {children}

      <div id="popups-root">
        {popups.map(({ Component, props }) => (
          <Component key={Component.key} {...props} />
        ))}
      </div>
    </>
  );
};
