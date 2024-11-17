import { SpotlightActionData } from "@mantine/spotlight/lib/Spotlight";
import { PAGES, USER_TYPE } from "../libraries";
import { navigate } from "./navigate";

export const spotLightActions: Record<PropertyKey, SpotlightActionData[]> = {
  [USER_TYPE.SUPER_ADMIN]: [
    {
      id: PAGES.ESTATES,
      label: "Estates",
      description: "Manage estates",
      onClick: () => navigate(PAGES.ESTATES),
    },
  ],

  [USER_TYPE.ADMIN]: [
    {
      id: PAGES.SUB_ADMINS,
      label: "Sub Admins",
      description: "Manage sub-administrators",
      onClick: () => navigate(PAGES.SUB_ADMINS),
    },
  ],

  [USER_TYPE.OCCUPANT]: [
    {
      id: PAGES.DASHBOARD,
      label: "Overview",
      description: "Get full information about current system status",
      onClick: () => navigate(PAGES.DASHBOARD),
    },
  ],
  [USER_TYPE.SUB_OCCUPANT]: [
    {
      id: PAGES.DASHBOARD,
      label: "Overview",
      description: "Get full information about current system status",
      onClick: () => navigate(PAGES.DASHBOARD),
    },
  ],
  [USER_TYPE.PROPERTY_OWNER]: [
    {
      id: PAGES.DASHBOARD,
      label: "Overview",
      description: "Get full information about current system status",
      onClick: () => navigate(PAGES.DASHBOARD),
    },
  ],
  [USER_TYPE.GATEMAN]: [
    {
      id: PAGES.DASHBOARD,
      label: "Overview",
      description: "Get full information about current system status",
      onClick: () => navigate(PAGES.DASHBOARD),
    },
  ],
  [USER_TYPE.GUEST]: [
    {
      id: USER_TYPE.GUEST,
      label: "Placeholder",
      description: "This is a placeholder",
      onClick: () => console.log("Placeholder"),
    },
  ],
};
