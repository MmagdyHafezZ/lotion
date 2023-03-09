import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from "./Template.js";
import Preview from "./Preview.js";
import Edit from "./Edit.js";
import Empty from "./Empty.js";

function App() {
  return (
    <BrowserRouter>
      {/* <Layout/> */}
      {/* console.log(window.location.href);   */}
      <Routes>
        <Route element={<Template />}>
          <Route path="/" element={<Empty />}></Route>
          <Route path="/Preview/:id" element={<Preview />}></Route>
          <Route path="/Edit/:id" element={<Edit />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
