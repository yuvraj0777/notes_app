import { PlusIcon, SearchIcon } from "lucide-react";
import React, { useReducer, useState } from "react";
import { noteReducer } from "../../Reducers/noteReducer";
import { useNote } from "../../Context/NoteContext";
import NoteCard from "../../NotesComponets/NoteCard";

const Home = () => {
  const { title, note, notes, dispatch } = useNote();
  const [date, setDate] = useState("");
  const [noteSearch, setNoteSearch] = useState("");

  const addTitle = (e) => {
    dispatch({ type: "ADD_TITLE", payload: e.target.value });
  };

  const addNote = (e) => {
    dispatch({ type: "ADD_NOTE", payload: e.target.value });
  };

  const onAddNotes = () => {
    dispatch({ type: "ADD_NOTES" });
    dispatch({ type: "CLEAR_INPUT" });
  };

  // const setCurrentDate = (e) => {
  //   const selectedDate = e.target.value;
  //   const isoDate = new Date(selectedDate).toISOString();
  //   setDate(selectedDate);
  //   dispatch({ type: "SET_DATE", payload: isoDate });
  // };

  const onSearchNote = (e) => {
    setNoteSearch(e.target.value);
  };

  const searchFilterNotes = notes.filter((note) => {
    return (
      note?.title?.toLowerCase()?.includes(noteSearch?.toLowerCase()) ||
      note?.note?.toLowerCase()?.includes(noteSearch?.toLowerCase())
    );
  });

  const pinnedNotes = searchFilterNotes.filter((note) => note.isPinned);
  const unpinnedNotes = searchFilterNotes.filter((note) => !note.isPinned);

  return (
    <>
      <div className="w-screen h-[100%] flex flex-col p-4 border-l-2 border-gray-200">
        <div className="border flex border-gray-400 rounded-full focus:outline-blue-500">
          <SearchIcon className="h-10 w-6 m-2 text-gray-500 flex justify-center items-center" />
          <input
            value={noteSearch}
            type="search"
            onChange={onSearchNote}
            placeholder="Search notes..."
            className="w-full h-[unset] rounded-full items-center p-2 outline-none"
          />
        </div>
        <div className="flex flex-col relative items-center border mt-10 w-[350px] h-[200px] border-gray-300 rounded-lg shadow-lg p-4">
          <input
            value={title}
            onChange={addTitle}
            placeholder="Enter title.."
            type="text"
            className=" w-[300px] outline-none p-2"
          />
          <textarea
            value={note}
            onChange={addNote}
            placeholder="Enter notes..."
            className="w-[300px] outline-none p-2 col-auto h-[100px] resize-y"
          />
          {/* <div className="flex ml-[-25px] gap-2">
            <label className="text-gray-600 font-semibold">Set Date:</label>
            <input
              value={date}
              onChange={setCurrentDate}
              type="datetime-local"
              className="border p-1 rounded-md focus:outline-blue-400"
            />
          </div> */}
          <button
            onClick={onAddNotes}
            disabled={title === "" || note === ""}
            className={`absolute right-0 bottom-0 p-1 ${
              title === "" || note === ""
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer opacity-100"
            } text-white bg-blue-500 rounded-full m-4 hover:bg-blue-700`}
          >
            <PlusIcon />
          </button>
        </div>
        {pinnedNotes.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-10">Pinned Notes</h2>
            <div className="grid grid-cols-4 gap-5 mt-10 flex-wrap">
              {pinnedNotes.map(
                ({ id, title, note, isPinned, date, createdAt }) => {
                  return (
                    <NoteCard
                      key={id}
                      id={id}
                      title={title}
                      note={note}
                      isPinned={isPinned}
                      date={date}
                      noteSearch={noteSearch}
                      createdAt={createdAt}
                    />
                  );
                }
              )}
            </div>
          </>
        )}

        {unpinnedNotes.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-10">Notes</h2>
            <div className="grid grid-cols-4 gap-5 mt-10 flex-wrap">
              {unpinnedNotes.map(
                ({ id, title, note, isPinned, date, createdAt }) => {
                  return (
                    <NoteCard
                      key={id}
                      id={id}
                      title={title}
                      note={note}
                      isPinned={isPinned}
                      date={date}
                      noteSearch={noteSearch}
                      createdAt={createdAt}
                    />
                  );
                }
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
