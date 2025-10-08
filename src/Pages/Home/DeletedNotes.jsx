import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Navbar/Sidebar";
import { useNote } from "../../Context/NoteContext";
import { RotateCcw, StoreIcon, Trash } from "lucide-react";

const DeletedNotes = () => {
  const { bin, dispatch } = useNote();
  const currentDate = Date.now();

  useEffect(() => {
    function autoCleanupTrash() {
      let storedData = JSON.parse(localStorage.getItem("notes")) || {
        notes: [],
        archive: [],
        bin: [],
      };

      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      // const oneWeek = 1 * 60 * 1000;

      storedData.bin = storedData.bin.filter((note) => {
        if (note.isDeleted && note.deleteAt) {
          return currentDate - note.deleteAt < oneWeek;
        }
        return true;
      });

      localStorage.setItem("notes", JSON.stringify(storedData));
    }

    autoCleanupTrash();
  }, [currentDate]);

  const binNotes = bin || [];

  const onRestoredNote = (id) => {
    dispatch({ type: "RESTORE_NOTE", payload: { id } });
  };

  return (
    <>
      <Navbar />
      <main className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <div className="w-full h-screen p-6 overflow-y-auto custom-scrollbar">
          <p className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 animate-pulse flex items-center justify-center">
            Your trash notes will be permanently deleted within 7 days
          </p>
          {binNotes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
              {binNotes.map((note) => (
                <div
                  key={note.id}
                  className="shadow-md w-[350px] rounded-2xl p-6 flex flex-col justify-between 
                             hover:shadow-xl hover:-translate-y-1 transition-all duration-300 
                             border border-red-600 bg-red-100 from-red-50 to-red-200 hover:bg-gradient-to-br"
                >
                  <h1 className="text-lg font-bold text-gray-800 break-words mb-3 line-clamp-2">
                    {note.title}
                  </h1>

                  <p
                    className="text-gray-600 text-sm leading-relaxed break-words overflow-y-auto 
                                max-h-[150px] custom-scrollbar pr-1"
                  >
                    {note.note}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-500 text-sm font-black">
                      {note.deleteAt
                        ? new Date(note.deleteAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : "No Date"}
                    </p>
                    <button
                      onClick={() => onRestoredNote(note.id)}
                      className="p-2 rounded-full text-green-500 hover:bg-green-300 transition-all duration-300 hover:animate-pulse"
                      title="Restore note"
                    >
                      <RotateCcw className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-full text-center">
              <div className="w-32 h-32 mb-4 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-4xl text-gray-400">📂</span>
              </div>
              <h1 className="text-gray-600 text-lg sm:text-xl font-medium">
                Bin is empty
              </h1>
              <p className="text-gray-400 text-sm mt-2">
                Notes you move to trash will show up here
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default DeletedNotes;
