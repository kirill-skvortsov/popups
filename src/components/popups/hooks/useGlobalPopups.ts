import { popupsStore } from "../store";
import { usePopups } from "./usePopups";

export const useGlobalPopups = () => {
  const popups = usePopups();
  return popups.filter((popup) => !popupsStore.local.has(popup.Component));
};
