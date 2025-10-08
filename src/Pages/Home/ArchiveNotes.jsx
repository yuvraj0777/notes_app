import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Navbar/Sidebar";
import { useNote } from "../../Context/NoteContext";
import { ArchiveRestore } from "lucide-react";

const ArchiveNotes = () => {
  const { archive, dispatch } = useNote();

  const archivedNotes = archive;

  const unarchiveNote = (id) => {
    dispatch({ type: "UNARCHIVE_NOTE", payload: { id } });
  };

  return (
    <>
      <Navbar />
      <main className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <div className="w-full h-screen p-6 overflow-y-auto custom-scrollbar">
          {archivedNotes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {archivedNotes.map((note) => (
                <div
                  key={note.id}
                  className="shadow-md w-[350px] rounded-2xl p-6 flex flex-col justify-between 
                             hover:shadow-xl hover:-translate-y-1 transition-all duration-300 
                             border border-blue-400 bg-blue-50 from-blue-50 to-blue-100 hover:bg-gradient-to-br "
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
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-sm font-black">
                      {note.archiveAt
                        ? new Date(note.archiveAt).toLocaleDateString("en-GB", {
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
                      onClick={() => unarchiveNote(note.id)}
                      className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-all duration-300 hover:animate-pulse"
                      title="Restore archive"
                    >
                      <ArchiveRestore className="h-5 w-5" />
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
                No archived notes yet
              </h1>
              <p className="text-gray-400 text-sm mt-2">
                Your archived notes will appear here.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ArchiveNotes;
