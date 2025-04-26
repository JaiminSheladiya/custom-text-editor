import React, { useRef, useState } from "react";
import { Button, Input, Card, Tooltip, Tag, Space } from "antd";
import "./Editor.css";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  MenuOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  UndoOutlined,
  RedoOutlined,
  CommentOutlined,
  CodeOutlined,
  InfoCircleOutlined,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const Editor = () => {
  const inputRef = useRef(null);
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
    justifyFull: false,
    insertOrderedList: false,
    insertUnorderedList: false,
    link: false,
  });

  const modifyText = async (command, value = null) => {
    inputRef.current.focus();
    const success = document.execCommand(command, false, value);
    console.log("success: ==>>", { command, value, success });

    setActiveCommands((prev) => {
      const justifyCommands = [
        "justifyLeft",
        "justifyCenter",
        "justifyRight",
        "justifyFull",
      ];
      const newState = { ...prev };

      if (justifyCommands.includes(command)) {
        justifyCommands.forEach((cmd) => {
          newState[cmd] = false;
        });
        newState[command] = document.queryCommandState(command);
      } else {
        newState[command] = document.queryCommandState(command);
      }

      return newState;
    });
  };

  const handleLink = async () => {
    const userLink = prompt("Enter a URL");
    if (userLink) {
      const formattedLink = /http/i.test(userLink)
        ? userLink
        : `http://${userLink}`;
      await modifyText("createLink", formattedLink);
    }
  };

  const handleFontChange = (font) => {
    inputRef.current.focus();
    document.execCommand("fontName", false, font);
  };

  const handleSizeChange = (size) => {
    inputRef.current.focus();
    document.execCommand("fontSize", false, size);
  };

  const selectStyle = {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #d9d9d9",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "inherit",
    backgroundColor: "#fff",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  };

  const colorInputStyle = {
    width: 36,
    height: 36,
    padding: 0,
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px",
          padding: "12px",
          backgroundColor: "#f9f9f9",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Tooltip title="Bold">
          <Button
            icon={<BoldOutlined />}
            type={activeCommands.bold ? "primary" : "default"}
            onClick={() => modifyText("bold")}
          />
        </Tooltip>
        <Tooltip title="Italic">
          <Button
            icon={<ItalicOutlined />}
            type={activeCommands.italic ? "primary" : "default"}
            onClick={() => modifyText("italic")}
          />
        </Tooltip>
        <Tooltip title="Underline">
          <Button
            icon={<UnderlineOutlined />}
            type={activeCommands.underline ? "primary" : "default"}
            onClick={() => modifyText("underline")}
          />
        </Tooltip>
        <Tooltip title="Strikethrough">
          <Button
            icon={<StrikethroughOutlined />}
            type={activeCommands.strikethrough ? "primary" : "default"}
            onClick={() => modifyText("strikethrough")}
          />
        </Tooltip>
        {/* <Tooltip title="Insert Link">
          <Button
            icon={<LinkOutlined />}
            type={activeCommands.link ? "primary" : "default"}
            onClick={handleLink}
          />
        </Tooltip>
        <Button onClick={() => modifyText("unlink")}>Unlink</Button> */}

        <Tooltip title="Align Left">
          <Button
            icon={<AlignLeftOutlined />}
            type={activeCommands.justifyLeft ? "primary" : "default"}
            onClick={() => modifyText("justifyLeft")}
          />
        </Tooltip>
        <Tooltip title="Align Center">
          <Button
            icon={<AlignCenterOutlined />}
            type={activeCommands.justifyCenter ? "primary" : "default"}
            onClick={() => modifyText("justifyCenter")}
          />
        </Tooltip>
        <Tooltip title="Align Right">
          <Button
            icon={<AlignRightOutlined />}
            type={activeCommands.justifyRight ? "primary" : "default"}
            onClick={() => modifyText("justifyRight")}
          />
        </Tooltip>
        <Tooltip title="Justify Full">
          <Button
            icon={<MenuOutlined />}
            type={activeCommands.justifyFull ? "primary" : "default"}
            onClick={() => modifyText("justifyFull")}
          />
        </Tooltip>

        <Tooltip title="Ordered List">
          <Button
            icon={<OrderedListOutlined />}
            type={activeCommands.insertOrderedList ? "primary" : "default"}
            onClick={() => modifyText("insertOrderedList")}
          />
        </Tooltip>

        <Tooltip title="Unordered List">
          <Button
            icon={<UnorderedListOutlined />}
            type={activeCommands.insertUnorderedList ? "primary" : "default"}
            onClick={() => modifyText("insertUnorderedList")}
          />
        </Tooltip>

        <select
          onChange={(e) => handleFontChange(e.target.value)}
          style={selectStyle}
        >
          {fontList.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => handleSizeChange(e.target.value)}
          style={selectStyle}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((size) => (
            <option key={size} value={size.toString()}>
              Size {size}
            </option>
          ))}
        </select>

        <Tooltip title="Text Color">
          <Input
            type="color"
            onChange={(e) => modifyText("foreColor", e.target.value)}
            style={colorInputStyle}
          />
        </Tooltip>

        <Tooltip title="Background Color">
          <Input
            type="color"
            onChange={(e) => modifyText("backColor", e.target.value)}
            style={colorInputStyle}
          />
        </Tooltip>

        <Tooltip title="Undo">
          <Button icon={<UndoOutlined />} onClick={() => modifyText("undo")} />
        </Tooltip>

        <Tooltip title="Redo">
          <Button icon={<RedoOutlined />} onClick={() => modifyText("redo")} />
        </Tooltip>

        <Tooltip title="Blockquote">
          <Button
            icon={<CommentOutlined />}
            onClick={() => modifyText("formatBlock", "BLOCKQUOTE")}
          >
            Quote
          </Button>
        </Tooltip>

        <Tooltip title="Code Block">
          <Button
            icon={<CodeOutlined />}
            onClick={() => modifyText("formatBlock", "PRE")}
          >
            Code
          </Button>
        </Tooltip>

        <Tooltip title="Normal Text">
          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => modifyText("formatBlock", "DIV")}
          >
            Normal
          </Button>
        </Tooltip>
      </div>

      <Card
        style={{
          marginTop: "16px",
          border: "1px solid #d9d9d9",
          borderRadius: "8px",
          height: "55vh",
          overflowY: "auto",
        }}
      >
        <div
          id="text-input"
          contentEditable="true"
          ref={inputRef}
          style={{
            width: "100%",
            height: "100%",
            outline: "none",
            color: "#333",
            fontSize: "1rem",
          }}
        ></div>
      </Card>

      <Tag color="green" style={{ marginTop: "1.5rem", float: "right" }}>
        <Space>
          <div>🚀 Author - Jaimin Sheladiya</div>

          <a
            href="https://github.com/jaiminsheladiya"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#333" }}
          >
            <GithubOutlined />
          </a>

          <a
            href="https://linkedin.com/in/jaiminsheladiya"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0077b5" }}
          >
            <LinkedinOutlined />
          </a>

          <a
            href="https://x.com/JaiminSheladiya"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1DA1F2" }}
          >
            <TwitterOutlined />
          </a>

          <a
            href="https://instagram.com/jaimin_sheladiya_"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#E1306C" }}
          >
            <InstagramOutlined />
          </a>
        </Space>
      </Tag>
    </div>
  );
};

export default Editor;
