import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddAssignment from "./pages/AddAssignment";
import AssignmentList from "./pages/AssignmentList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddAssignment />} />
        <Route path="/assignments" element={<AssignmentList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;