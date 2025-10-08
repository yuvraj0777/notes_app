import { v4 as uuid } from "uuid";

export const noteReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_TITLE":
      return {
        ...state,
        title: payload,
      };
    case "ADD_NOTE":
      return {
        ...state,
        note: payload,
      };
    case "ADD_NOTES":
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            title: state.title,
            note: state.note,
            id: uuid(),
            isPinned: false,
            date: state.date,
            createdAt: new Date(),
          },
        ],
      };
    case "PIN_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === payload.id ? { ...note, isPinned: !note.isPinned } : note
        ),
      };
    case "ARCHIVE_NOTE":
      return {
        ...state,
        archive: [
          ...state.archive,
          {
            ...state.notes.find(({ id }) => id === payload.id),
            archiveAt: Date.now(),
          },
        ],
        notes: state.notes.filter((note) => note.id !== payload.id),
      };
    case "UNARCHIVE_NOTE":
      return {
        ...state,
        notes: [
          ...state.notes,
          state.archive.find(({ id }) => id === payload.id),
        ],
        archive: state.archive.filter((note) => note.id !== payload.id),
      };
    case "BIN_NOTE":
      return {
        ...state,
        bin: [
          ...state.bin,
          {
            ...state.notes.find(({ id }) => id === payload.id),
            isDeleted: true,
            deleteAt: Date.now(),
          },
        ],
        notes: state.notes.filter((note) => note.id !== payload.id),
      };
    case "RESTORE_NOTE":
      return {
        ...state,
        notes: [...state.notes, state.bin.find(({ id }) => id === payload.id)],
        bin: state.bin.filter((note) => note.id !== payload.id),
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== payload.id),
      };
    case "SET_DATE":
      return {
        ...state,
        date: payload,
      };
    case "CLEAR_INPUT":
      return {
        ...state,
        title: "",
        note: "",
        date: "",
      };
    default:
      return {
        ...state,
      };
  }
};
