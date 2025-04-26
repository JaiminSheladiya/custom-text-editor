import React, { useEffect, useState, useRef } from "react";
import { Button, Select, Input } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  LinkOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const Toolbar = ({ editorRef }) => {
  const fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "cursive",
  ];

  const [activeCommands, setActiveCommands] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
    link: false,
  });

  const lastSelection = useRef(null);

  useEffect(() => {
    // Save selection state when user selects text
    const saveSelection = () => {
      if (window.getSelection) {
        const sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          lastSelection.current = sel.getRangeAt(0).cloneRange();
          updateActiveStyles();
        }
      }
    };

    // Update active formatting buttons based on current selection
    const updateActiveStyles = () => {
      if (!window.getSelection || !window.getSelection().rangeCount) return;

      const selection = window.getSelection();
      const parentElement = selection.anchorNode?.parentElement;

      if (!parentElement) return;

      // Check styles by inspecting selected element and its parents
      let current = parentElement;
      const ancestors = [];

      while (current && current !== editorRef.current) {
        ancestors.push(current);
        current = current.parentElement;
      }

      setActiveCommands({
        bold: ancestors.some(
          (el) =>
            window.getComputedStyle(el).fontWeight === "bold" ||
            window.getComputedStyle(el).fontWeight >= 700
        ),
        italic: ancestors.some(
          (el) => window.getComputedStyle(el).fontStyle === "italic"
        ),
        underline: ancestors.some((el) =>
          window.getComputedStyle(el).textDecoration.includes("underline")
        ),
        strikethrough: ancestors.some((el) =>
          window.getComputedStyle(el).textDecoration.includes("line-through")
        ),
        justifyLeft: ancestors.some(
          (el) => window.getComputedStyle(el).textAlign === "left"
        ),
        justifyCenter: ancestors.some(
          (el) => window.getComputedStyle(el).textAlign === "center"
        ),
        justifyRight: ancestors.some(
          (el) => window.getComputedStyle(el).textAlign === "right"
        ),
        link: ancestors.some((el) => el.tagName === "A"),
      });
    };

    document.addEventListener("selectionchange", saveSelection);
    return () => document.removeEventListener("selectionchange", saveSelection);
  }, [editorRef]);

  // Restore last selection
  const restoreSelection = () => {
    if (lastSelection.current) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(lastSelection.current);
    }
  };

  // Format selected text
  const modifyText = (command, value = null) => {
    if (!editorRef.current) return;

    // Make sure editor has focus and selection is restored
    editorRef.current.focus();
    restoreSelection();

    switch (command) {
      case "bold":
        document.execCommand("bold", false, null);
        break;
      case "italic":
        document.execCommand("italic", false, null);
        break;
      case "underline":
        document.execCommand("underline", false, null);
        break;
      case "strikethrough":
        document.execCommand("strikethrough", false, null);
        break;
      case "justifyLeft":
        document.execCommand("justifyLeft", false, null);
        break;
      case "justifyCenter":
        document.execCommand("justifyCenter", false, null);
        break;
      case "justifyRight":
        document.execCommand("justifyRight", false, null);
        break;
      case "fontName":
        document.execCommand("fontName", false, value);
        break;
      case "fontSize":
        document.execCommand("fontSize", false, value);
        break;
      case "foreColor":
        document.execCommand("foreColor", false, value);
        break;
      case "backColor":
        document.execCommand("backColor", false, value);
        break;
      case "createLink":
        document.execCommand("createLink", false, value);
        break;
      case "unlink":
        document.execCommand("unlink", false, null);
        break;
      default:
        break;
    }

    // Update selection and styles after modification
    window.setTimeout(() => {
      const sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        lastSelection.current = sel.getRangeAt(0).cloneRange();
      }

      // Update active styles
      setActiveCommands((prev) => ({
        ...prev,
        [command]: true,
      }));
    }, 0);
  };

  const handleLink = () => {
    const userLink = prompt("Enter a URL");
    if (userLink) {
      const formattedLink = /http/i.test(userLink)
        ? userLink
        : `http://${userLink}`;
      modifyText("createLink", formattedLink);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "8px",
        padding: "10px",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #d9d9d9",
      }}
    >
      {/* Text Format Buttons */}
      <Button
        icon={<BoldOutlined />}
        type={activeCommands.bold ? "primary" : "default"}
        onClick={() => modifyText("bold")}
      />
      <Button
        icon={<ItalicOutlined />}
        type={activeCommands.italic ? "primary" : "default"}
        onClick={() => modifyText("italic")}
      />
      <Button
        icon={<UnderlineOutlined />}
        type={activeCommands.underline ? "primary" : "default"}
        onClick={() => modifyText("underline")}
      />
      <Button
        icon={<StrikethroughOutlined />}
        type={activeCommands.strikethrough ? "primary" : "default"}
        onClick={() => modifyText("strikethrough")}
      />

      {/* Link Buttons */}
      <Button
        icon={<LinkOutlined />}
        type={activeCommands.link ? "primary" : "default"}
        onClick={handleLink}
      />
      <Button onClick={() => modifyText("unlink")}>Unlink</Button>

      {/* Alignment Buttons */}
      <Button
        icon={<AlignLeftOutlined />}
        type={activeCommands.justifyLeft ? "primary" : "default"}
        onClick={() => modifyText("justifyLeft")}
      />
      <Button
        icon={<AlignCenterOutlined />}
        type={activeCommands.justifyCenter ? "primary" : "default"}
        onClick={() => modifyText("justifyCenter")}
      />
      <Button
        icon={<AlignRightOutlined />}
        type={activeCommands.justifyRight ? "primary" : "default"}
        onClick={() => modifyText("justifyRight")}
      />

      {/* Font Name */}
      <Select
        defaultValue="Arial"
        style={{ width: 120 }}
        onChange={(value) => modifyText("fontName", value)}
      >
        {fontList.map((font) => (
          <Option key={font} value={font}>
            {font}
          </Option>
        ))}
      </Select>

      {/* Font Size */}
      <Select
        defaultValue={3}
        style={{ width: 80 }}
        onChange={(value) => modifyText("fontSize", value)}
      >
        {[1, 2, 3, 4, 5, 6, 7].map((size) => (
          <Option key={size} value={size}>
            {size}
          </Option>
        ))}
      </Select>

      {/* Font Color */}
      <Input
        type="color"
        onChange={(e) => modifyText("foreColor", e.target.value)}
        style={{ width: 40, height: 40, padding: 0, border: "none" }}
      />

      {/* Background Color */}
      <Input
        type="color"
        onChange={(e) => modifyText("backColor", e.target.value)}
        style={{ width: 40, height: 40, padding: 0, border: "none" }}
      />
    </div>
  );
};

export default Toolbar;
