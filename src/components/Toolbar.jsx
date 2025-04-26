import React, { useEffect } from "react";

const Toolbar = () => {
  const fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "cursive",
  ];

  useEffect(() => {
    // Initialize font size
    document.getElementById("fontSize").value = 3;
  }, []);

  const modifyText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleLink = () => {
    const userLink = prompt("Enter a URL");
    const formattedLink = /http/i.test(userLink)
      ? userLink
      : `http://${userLink}`;
    modifyText("createLink", formattedLink);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-gray-100 border-b border-gray-300">
      {/* Text Format */}
      <button
        onClick={() => modifyText("bold")}
        className="toolbar-btn"
      >
        <i className="fa-solid fa-bold"></i>
      </button>
      <button
        onClick={() => modifyText("italic")}
        className="toolbar-btn"
      >
        <i className="fa-solid fa-italic"></i>
      </button>
      <button
        onClick={() => modifyText("underline")}
        className="toolbar-btn"
      >
        <i className="fa-solid fa-underline"></i>
      </button>
      <button
        onClick={() => modifyText("strikethrough")}
        className="toolbar-btn"
      >
        <i className="fa-solid fa-strikethrough"></i>
      </button>

      {/* Link */}
      <button
        onClick={handleLink}
        className="toolbar-btn"
      >
        <i className="fa fa-link"></i>
      </button>
      <button
        onClick={() => modifyText("unlink")}
        className="toolbar-btn"
      >
        <i className="fa fa-unlink"></i>
      </button>

      {/* Alignment */}
      <button
        onClick={() => modifyText("justifyLeft")}
        className="toolbar-btn"
      >
        <i className="fa-solid fa-align-left"></i>
      </button>
      <button
        onClick={() => modifyText("justifyCenter")}
        className="toolbar-btn"
      >
        <i className="fa-solid fa-align-center"></i>
      </button>
      <button
        onClick={() => modifyText("justifyRight")}
        className="toolbar-btn"
      >
        <i className="fa-solid fa-align-right"></i>
      </button>
      <button
        onClick={() => modifyText("justifyFull")}
        className="toolbar-btn"
      >
        <i className="fa-solid fa-align-justify"></i>
      </button>

      {/* Font */}
      <select
        id="fontName"
        onChange={(e) => modifyText("fontName", e.target.value)}
        className="toolbar-select"
      >
        {fontList.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
      <select
        id="fontSize"
        onChange={(e) => modifyText("fontSize", e.target.value)}
        className="toolbar-select"
      >
        {[1, 2, 3, 4, 5, 6, 7].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      {/* Color */}
      <input
        type="color"
        onChange={(e) => modifyText("foreColor", e.target.value)}
        className="toolbar-color"
      />
      <input
        type="color"
        onChange={(e) => modifyText("backColor", e.target.value)}
        className="toolbar-color"
      />
    </div>
  );
};

export default Toolbar;



