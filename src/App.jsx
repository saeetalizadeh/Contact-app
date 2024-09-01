import Header from "./components/Header";
import Contacts from "./components/Contacts";
import { useState } from "react";

function App() {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <>
      <Header
        search={search}
        show={show}
        setSearch={setSearch}
        setShow={setShow}
      />
      <Contacts
        search={search}
        setSearch={setSearch}
        show={show}
        setShow={setShow}
      />
    </>
  );
}

export default App;
