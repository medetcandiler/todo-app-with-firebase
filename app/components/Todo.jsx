import { FaRegTrashAlt } from "react-icons/fa";

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex `,
  checkbox: `cursor-pointer`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center hover:text-red-500`,
};

function Todo({ todo, handleToggle, handleDelete }) {
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input className={style.checkbox} onChange={() => handleToggle(todo)} type="checkbox" checked={todo.completed} />
        <p onClick={() => handleToggle(todo)} className={todo.completed ? style.textComplete : style.text}>
          {todo.text}
        </p>
      </div>
      <button className={style.button} onClick={()=> handleDelete(todo)}>{<FaRegTrashAlt />}</button>
    </li>
  );
}

export default Todo;
