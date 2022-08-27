import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = (props) => {
  const { items, removeItem, editItem } = props;
  return (
    <React.Fragment>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id}>
            <div>
              <p>{title}</p>
              <button onClick={() => editItem(id)}>
                <FaEdit />
              </button>
              <button onClick={() => removeItem(id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </React.Fragment>
  );
};

export default List;
