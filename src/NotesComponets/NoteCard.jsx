import React, { useEffect, useState } from "react";
import { useNote } from "../Context/NoteContext";
import { Archive, PinIcon, Trash2Icon } from "lucide-react";

const NoteCard = ({ title, note, id, isPinned, date, createdAt }) => {
  const { dispatch } = useNote();

  const onPinned = (id) => {
    dispatch({ type: "PIN_NOTE", payload: { id } });
  };

  const onDeleteNote = (id) => {
    // dispatch({ type: "DELETE_NOTE", payload: { id } });
    dispatch({ type: "BIN_NOTE", payload: { id } });
  };

  const onArchive = (id) => {
    dispatch({ type: "ARCHIVE_NOTE", payload: { id } });
  };

  return (
    <div
      className={`border w-[350px] flex flex-col gap-4 rounded-2xl shadow-md p-5 transition-all duration-300 
        hover:shadow-2xl hover:-translate-y-2 mb-10 hover:bg-gradient-to-br 
        ${
          isPinned
            ? "border-yellow-400 bg-yellow-50 from-yellow-50 to-yellow-100"
            : "border-gray-200 bg-white from-white to-gray-50"
        }`}
      key={id}
    >
      <div className="flex justify-between items-center relative">
        <h1 className="text-xl font-semibold text-gray-800 break-words w-[250px] tracking-wide">
          {title}
        </h1>
        <button
          onClick={() => onPinned(id)}
          className={`p-2 rounded-full absolute top-0 right-0 transition-all duration-300 
            ${
              isPinned
                ? "bg-yellow-200 text-yellow-600 hover:bg-yellow-300"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            }`}
          title={isPinned ? "Unpin note" : "Pin note"}
        >
          <PinIcon className={`h-5 w-5 ${isPinned ? "fill-black" : ""}`} />
        </button>
      </div>
      <div className="flex justify-between items-start overflow-y-auto max-h-[150px] custom-scrollbar pr-1">
        <p className="text-gray-700 text-base leading-relaxed break-words w-[270px]">
          {note}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <small className="text-gray-500 text-sm font-black">
          {createdAt
            ? new Date(createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : "No Date"}
        </small>
        <div className="flex gap-1">
          <button
            disabled={isPinned ? true : false}
            onClick={() => onDeleteNote(id)}
            className={`p-2 rounded-full text-red-500 hover:bg-red-100 transition-all duration-300 hover:animate-pulse ${
              isPinned ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            title={isPinned ? "Can't delete pin notes" : "Delete note"}
          >
            <Trash2Icon className="h-5 w-5" />
          </button>
          <button
            className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-all duration-300 hover:animate-pulse"
            onClick={() => onArchive(id)}
            title="Archive note"
          >
            <Archive className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
