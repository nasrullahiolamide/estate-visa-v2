import { MessagesData } from "@/builders/types/messages";
import { BtnProps } from "../interface/empty-slot";

export enum MESSAGE_TYPE {
  OCCUPANT = "occupant",
  BROADCAST = "broadcast",
}

export enum RECIPIENTS {
  ALL_HOUSES = "All Houses",
  ALL_ACTIVE_HOUSES = "All Active Houses",
  ALL_ADMINS = "All Admins",
}

export type ConversationProps = {
  data: MessagesData[] | undefined;
  loading?: boolean;
  recipient?: string;
  isAdmin?: boolean;
} & (
  | {
      isAdmin: true;
      emptyProps: {
        title: string;
        text: string;
        btnProps: BtnProps;
      };
    }
  | {
      isAdmin?: false;
      emptyProps?: {
        title: string;
        text: string;
        btnProps: BtnProps;
      };
    }
);
