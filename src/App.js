import './App.css';

import {useState, useEffect} from "react";
import {BsTrash, BsBookmarkCheck, BsBookmarkCheckFill} from "react-icons/bs";

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() =>{

    const loadData = async()=>{
      setLoading(true);

      const res = await fetch(API + "/todos")
      .then((res) => res.json()).then((data) => data)
      .catch((err) => console.log(err));

      setLoading(false);

      setTodos(res);

    };

    loadData();

  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      id: Math.random(),
      title,
      time,
      done:false,
    };
    await fetch(API + "/todos",{
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json",
      },
    });
    setTitle("");
    setTime("");
  }
  return (
    <div className="App">
      <div className="todo-header">
        <h1>React Todo</h1>
        <h4>Falta listar as atividades</h4>
      </div>
      <div className="form-todo">
        <h2> Insira a sua tarefa </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">Título da tarefa</label>
            <input
            type="text" 
            name="title" 
            placeholder="Título da tarefa" 
            onChange={(e)=> setTitle(e.target.value)}
            value={title || ""}
            required 
            />
          </div>
          <div className="form-control">
            <label htmlFor="time">Quantas horas irá durar</label>
            <input
            type="text" 
            name="time" 
            placeholder="tempo de duração em horas" 
            onChange={(e)=> setTime(e.target.value)}
            value={time || ""}
            required 
            />
          </div>
          <input type="submit" value="cadastrar"/>
        </form>
      </div>
      <div className="list-todo">
        <h2> Listas de tarefas:</h2>
        {todos.length === 0 ? <p>Não existem tarefas</p> : console.log("tem mais q 0")}
        


      </div>
    </div>
  );
}

export default App;
