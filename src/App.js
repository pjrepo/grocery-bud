import React, { useEffect, useState } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) return JSON.parse(localStorage.getItem("list"));
  else return [];
};

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "" });

  const showAlert = (show = false, msg = "") => {
    setAlert({ show: show, msg: msg });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!name) {
      showAlert(true, "Please enter an item");
    } else {
      if (isEditing) {
        setList(
          list.map((item) => {
            if (item.id === editId) return { ...item, title: name };
            return item;
          })
        );
        setName("");
        setEditId(null);
        setIsEditing(false);
        showAlert(true, "Edited the item successfully");
      } else {
        showAlert(true, "Item added to the list successfully.");
        const newItem = { id: new Date().getTime().toString(), title: name };
        setList([...list, newItem]);
        setName("");
      }
    }
  };

  const changeHandler = (event) => setName(event.target.value);

  const clearItemsHandler = () => {
    showAlert(true, "Empty list");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "Item removed from the list successfully.");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const itemToEdit = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(itemToEdit.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <React.Fragment>
      <section>
        <form onSubmit={submitHandler}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <h1>Grocery Bud</h1>
          <div>
            <input
              type="text"
              placeholder="eg. wheat flour"
              value={name}
              onChange={changeHandler}
            />
            <button>{isEditing ? "edit" : "submit"}</button>
          </div>
        </form>
        {list.length > 0 && (
          <div>
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button onClick={clearItemsHandler}>clear Items</button>
          </div>
        )}
      </section>
    </React.Fragment>
  );
};

export default App;
