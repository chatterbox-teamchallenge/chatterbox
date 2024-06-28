import React from "react";
import Start from "./pages/Start/Start";
import Chat from "./pages/Chat/Chat";

function App() {
  return (
    <div className="App">
      {localStorage.getItem("token") ? <Chat /> : <Start />}
    </div>
  );
}

export default App;
