import { FaRegTrashAlt, FaEdit } from "react-icons/fa";

import Loader from "./Loader";

const style = {
  li: `relative flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex items-center `,
  checkbox: `cursor-pointer`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer hover:text-red-500`,
  editButton: `cursor-pointer hover:opacity-75`,
  activeEditButton: `cursor-pointer animate-bounce opacity-50`,
  btnContainer: `flex items-center space-x-1`,
};

function Todo({ todo, handleToggle, handleDelete, handleEdit }) {
  return (
    <li className={(todo.completed || todo.onEdit) ? style.liComplete : style.li}>
      <div className={style.row}>
        <input
          className={style.checkbox}
          onChange={() => handleToggle(todo)}
          type="checkbox"
          checked={todo.completed}
        />
        <p
          onClick={() => handleToggle(todo)}
          className={todo.completed ? style.textComplete : style.text}
        >
          {todo.text}
        </p>
        <div className="absolute left-1/2">{todo.onEdit && <Loader />}</div>
      </div>
      <div className={style.btnContainer}>
        <button
          onClick={() => handleEdit(todo)}
          className={todo.onEdit ? style.activeEditButton : style.editButton}
        >
          {<FaEdit />}
        </button>
        <button className={style.button} onClick={() => handleDelete(todo)}>
          {<FaRegTrashAlt />}
        </button>
      </div>
    </li>
  );
}

export default Todo;
