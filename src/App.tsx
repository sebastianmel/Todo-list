import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

type Priority = "Urgente" | "Moyenne" | "Basse" 

type Todo = {
  id: number;
  text: string;
  priority: Priority
}

function App() {
   const [input ,setInput] = useState<string>("")
   const [priority ,setPriority] = useState<Priority>("Moyenne")
   const savedTodos = localStorage.getItem("todos")
   const initialTodos: Todo[] = savedTodos ? JSON.parse(savedTodos) : []
   const [todos, setTodos] = useState<Todo[]>(initialTodos)
   const [filter, setFilter] = useState<Priority | "Tous">("Tous")

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  function addTodo() {
    if (input.trim() == "" ){
      return
    }
    const newTodo: Todo ={
      id: Date.now(),
      text: input.trim(),
      priority: priority
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
    setInput("") 
    setPriority("Moyenne")
    console.log(newTodos)
  }
  function deleteTodo(id: number) {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  let filteredTodos : Todo[] =[]
  if (filter === "Tous"){
    filteredTodos = todos
  } else {
    filteredTodos = todos.filter(todo => todo.priority === filter)
  }
  const urgenteCount = todos.filter(todo => todo.priority === "Urgente").length
  const moyenneCount = todos.filter(todo => todo.priority === "Moyenne").length
  const basseCount = todos.filter(todo => todo.priority === "Basse").length
  const totalCount = todos.length


  return (
   <div className="flex justify-center">
      <div className="w-2/3 flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
        <div className="flex gap-4">
          <input 
          type="text" 
          className="input w-full"
          placeholder="Ajouter une tâche..."
          value={input}
          onChange={(e)=> setInput(e.target.value)}
          /> 
          <select 
          className="select w-full"
          value={priority}
          onChange={(e)=> setPriority(e.target.value as Priority)}
          >
            <option value="Urgente">Urgente</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>


          </select>     
          <button onClick={addTodo} className="btn btn-primary">
            Ajouter</button> 
        </div>
        <div className="space-y-2 flex-1 h-fit my-5">

          <div className="flex flex-wrap gap-4">
            <button className={`btn btn-soft ${filter === "Tous" ? "btn-primary" : ""}`}
            onClick={() => setFilter("Tous")}
            >Tous({totalCount})
            </button>
            <button className={`btn btn-soft ${filter === "Urgente" ? "btn-primary" : ""}`}
            onClick={() => setFilter("Urgente")}
            >Urgente({urgenteCount})
            </button>
            <button className={`btn btn-soft ${filter === "Moyenne" ? "btn-primary" : ""}`}
            onClick={() => setFilter("Moyenne")}
            >Moyenne({moyenneCount})
            </button>
            <button className={`btn btn-soft ${filter === "Basse" ? "btn-primary" : ""}`}
            onClick={() => setFilter("Basse")}
            >Basse({basseCount})
            </button>
          </div>

          {filteredTodos.length > 0 ? (
            <ul className="divide-y divide-primary/20%">
              {filteredTodos.map(todo =>(
                <li key={todo.id}>
                  <TodoItem todo={todo}/>
                </li>
              ))}
            </ul>
            ):(

            <div>vide</div>
            
            )}
        </div>
      </div>

   </div>
  )
}

export default App
