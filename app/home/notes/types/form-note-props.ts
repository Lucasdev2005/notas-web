import { Note } from "./note";

export interface FormNoteProps {
  onClose: () => void;
  note?: Note | null | undefined;
}