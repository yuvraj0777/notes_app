import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArchiveNotes from "./Pages/Home/ArchiveNotes.jsx";
import ImportantNotes from "./Pages/Home/ImportantNotes.jsx";
import DeletedNotes from "./Pages/Home/DeletedNotes.jsx";
import { NoteProvider } from "./Context/NoteContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <NoteProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/archive" element={<ArchiveNotes />} />
          <Route path="/important" element={<ImportantNotes />} />
          <Route path="/bin" element={<DeletedNotes />} />
        </Routes>
      </NoteProvider>
    </BrowserRouter>
  </StrictMode>
);
