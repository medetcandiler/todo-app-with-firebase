"use client";
import { useState, useEffect, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

import Todo from "./components/Todo";
import ValidationMsg from "./components/ValidationMsg";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [isValidate, setIsValidate] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const editInput = useRef();
  const [cases, setCases] = useState("All");
  const [filtered, setFiltered ] = useState([]);

  // edit todo
  const handleEdit = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      onEdit: !todo.onEdit,
    });
    setSelectedTodo({ ...todo, onEdit: !todo.onEdit });

    editInput.current.focus();
  };

  // create todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input === "") {
      setIsValidate(true);
      setTimeout(() => {
        setIsValidate(false);
      }, 2000);
      return;
    }
    if (!selectedTodo?.onEdit) {
      setInput("");
      await addDoc(collection(db, "todos"), {
        text: input,
        completed: false,
        onEdit: false,
      });
    } else {
      setInput("");
      await updateDoc(doc(db, "todos", selectedTodo?.id), {
        text: input,
        onEdit: false,
      });
      setSelectedTodo((prev) => ({
        ...prev,
        onEdit: false,
      }));
    }
  };

  // read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      let todosArr = [];
      querySnapShot.forEach((doc) => {
        todosArr.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {

    if (cases === "All") {
      setFiltered(todos); 
    } else if (cases === "Active") {
      const filtered = todos.filter(todo => !todo.completed)
      setFiltered(filtered);
    } else if (cases === "Completed") {
      const filtered = todos.filter((todo) => todo.completed);
      setFiltered(filtered);
    }
  }, [cases, todos]);

  // update todo in firebase
  const handleToggle = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // delete todo
  const handleDelete = async (todo) => {
    await deleteDoc(doc(db, "todos", todo.id));
  };

  const style = {
    bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
    container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
    heading: `text-3xl font-bold text-center text-gray-800 p-2`,
    form: `flex justify-between`,
    input: `border p-2 w-full text-xl`,
    button: `border p-4 ml-2 bg-purple-500 text-slate-100 hover:opacity-70`,
    count: `text-center p-2`,
  };

  return (
    <main className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={handleSubmit} className={style.form}>
          {selectedTodo?.onEdit ? (
            <input
              onChange={(e) => setInput(e.target.value)}
              ref={editInput}
              value={input}
              className={style.input}
              placeholder={`Edit "${selectedTodo?.text}" to new todo..`}
            />
          ) : (
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className={style.input}
              placeholder="Add todo"
              ref={editInput}
            />
          )}
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        {isValidate && <ValidationMsg />}
        <ul>
          {filtered.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </ul>
        {filtered.length < 1 ? (
          <p className={style.count}>You have any todos</p>
        ) : (
          <p className={style.count}>You have {filtered.length} todos</p>
        )}
        <div className="flex justify-center space-x-3">
          <button
            onClick={(e) => setCases(e.target.textContent)}
            className="btn"
          >
            All
          </button>
          <button
            onClick={(e) => setCases(e.target.textContent)}
            className="btn"
          >
            Active
          </button>
          <button
            onClick={(e) => setCases(e.target.textContent)}
            className="btn"
          >
            Completed
          </button>
        </div>
      </div>
    </main>
  );
}
