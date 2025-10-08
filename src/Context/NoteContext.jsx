import { useContext, createContext, useReducer, useEffect } from "react";
import { noteReducer } from "../Reducers/noteReducer";

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const initialState = {
    title: "",
    note: "",
    notes: [],
    archive: [],
    bin: [],
  };

  const [state, dispatch] = useReducer(noteReducer, initialState, () => {
    try {
      const localData = JSON.parse(localStorage.getItem("notes"));
      if (localData && typeof localData === "object") {
        return {
          ...initialState,
          ...localData,
          notes: Array.isArray(localData.notes) ? localData.notes : [],
          archive: Array.isArray(localData.archive) ? localData.archive : [],
          bin: Array.isArray(localData.bin) ? localData.bin : [],
        };
      }
      return initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(state));
  }, [state]);

  return (
    <NoteContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

const useNote = () => useContext(NoteContext);

export { useNote, NoteProvider };
