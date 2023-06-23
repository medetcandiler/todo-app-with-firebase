"use client";
import { useState, useEffect } from "react";
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

  // create todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input === "") {
      setIsValidate(true);
      setTimeout(() => {
        setIsValidate(false);
      }, 2000);
      return
    }

    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
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
        setTodos(todosArr);
      });
    });

    return () => unsubscribe();
  }, []);

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
    button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
    count: `text-center p-2`,
  };

  return (
    <main className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={handleSubmit} className={style.form}>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className={style.input}
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        {isValidate && <ValidationMsg />}
        <ul>
          {todos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>You have {todos.length} todos</p>
        )}
      </div>
    </main>
  );
}
