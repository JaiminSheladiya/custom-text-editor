import React from "react";
import Editor from "./components/Editor";
import "./App.css";
import { Card } from "antd";
function App() {
  return (
    <div className="container">
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}
      >
        <Card
          title="Apiwiz Text Editor"
          variant="borderless"
          style={{ background: "white" }}
        >
          <Editor />
        </Card>
      </div>
    </div>
  );
}

export default App;
