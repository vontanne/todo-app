import React, { useState } from "react";
import "./Todo.css";
import iconEdit from "./icons/iconEdit.png";
import iconTrash from "./icons/iconTrash.png";

function Todo() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  const handleChange = (event) => {
    const { value } = event.target;
    if (42 < value.length) {
      return;
    }
    setInput(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if ("" === input) return;
    if ("clear" === input) {
      setItems([]);
      setInput("");
      return;
    }
    const newItem = {
      text: input,
      id: Math.random(),
      done: false,
      important: false,
    };

    setItems((items) => {
      return [newItem, ...items];
    });

    setInput("");
  };

  const toggleCheckDone = (event) => {
    const { id, parentNode } = event.target;
    const toggleDoneItem = items.find((item) => item.id === Number(id));
    toggleDoneItem.done = !toggleDoneItem.done;

    const idx = items.findIndex((item) => item.id === Number(id));
    const before = items.slice(0, idx);
    const after = items.slice(idx + 1);

    setItems([...before, toggleDoneItem, ...after]);

    const elem = parentNode;
    const toggleDoneTextElem = elem.nextSibling;

    if (toggleDoneItem.done) {
      toggleDoneTextElem.classList.add("done");
    } else {
      toggleDoneTextElem.classList.remove("done");
    }
  };

  const toggleCheckImportant = (event) => {
    const { id } = event.target;
    const toggleImportantItem = items.find((item) => item.id === Number(id));
    toggleImportantItem.important = !toggleImportantItem.important;

    const idx = items.findIndex((item) => item.id === Number(id));
    const before = items.slice(0, idx);
    const after = items.slice(idx + 1);

    setItems([...before, toggleImportantItem, ...after]);

    if (toggleImportantItem.important) {
      event.target.classList.add("important");
    } else {
      event.target.classList.remove("important");
    }
  };

  const editItem = (event) => {
    const { id } = event.target;
    const modifydItem = items.find((item) => item.id === Number(id));
    const defaultValue = modifydItem.text;
    const modifyText = window.prompt("insert your change", defaultValue);
    if (null === modifyText) return;
    modifydItem.text = modifyText;

    const idx = items.findIndex((item) => item.id === Number(id));
    const before = items.slice(0, idx);
    const after = items.slice(idx + 1);

    setItems([...before, modifydItem, ...after]);
  };

  const removeItem = (event) => {
    const { id } = event.target;

    const idx = items.findIndex((item) => item.id === Number(id));
    const before = items.slice(0, idx);
    const after = items.slice(idx + 1);

    setItems([...before, ...after]);
  };
  return (
    <div className="main">
      <h4 className="header">
        {items.filter((item) => item.done === false).length} more to do{" "}
        {items.filter((item) => item.done === true).length} done
      </h4>
      <form onSubmit={handleSubmit} className="form">
        <input
          className="input"
          value={input}
          placeholder="What needs to be done?"
          onChange={handleChange}
        />
        <button className="btn">Add</button>
      </form>
      <ul className="todo-list">
        {items.map((item) => (
          <li key={item.id} className="list-item">
            <span className="checkbox">
              <input type="checkbox" onChange={toggleCheckDone} id={item.id} />
            </span>
            <span className="text" onClick={toggleCheckImportant} id={item.id}>
              {item.text}
            </span>
            <span className="edit" onClick={editItem}>
              <img src={iconEdit} alt="Edit" id={item.id} />
            </span>
            <span className="trash" onClick={removeItem}>
              <img src={iconTrash} alt="Trash" id={item.id} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
