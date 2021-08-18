import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed';
type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
type TasksType = {
    [todoListID: string]: Array<TaskType>
}

function App() {

    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Eggs', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Water', isDone: false},
            {id: v1(), title: 'Cake', isDone: false},
        ],
    });

    const removedTask = (id: string, todoListID: string) => {
        const tasksOfList = tasks[todoListID]
        tasks[todoListID] = tasksOfList.filter(t => t.id !== id)
        setTasks({...tasks})
    }
    const changeFilter = (value: FilterType, todoListID: string) => {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) todoList.filter = value
        setTodoLists([...todoLists])
    }
    const addTask = (text: string, todoListID: string) => {
        const newTask: TaskType = {id: v1(), title: text, isDone: false}
        tasks[todoListID].push(newTask)
        setTasks({...tasks})
    }
    const changeStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        const updatedTask = tasks[todoListID].find((t) => t.id === taskID)
        if (updatedTask) {
            updatedTask.isDone = isDone
        }
        setTasks({...tasks})
    }
    const removeList = (todoListID: string) => {
        const updatedList = todoLists.filter(tl => tl.id !== todoListID)
        setTodoLists(updatedList)
    }

    const todoListElement = todoLists.map(tl => {
        let filteredTasks = tasks[tl.id]
        if (tl.filter === 'active') filteredTasks = tasks[tl.id].filter((t) => !t.isDone)
        if (tl.filter === 'completed') filteredTasks = tasks[tl.id].filter((t) => t.isDone)
        return <TodoList
            key={tl.id}
            todoListID={tl.id}
            title={tl.title}
            tasks={filteredTasks}
            removeTask={removedTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={tl.filter}
            removeList={removeList}
        />
    })

    return (
        <div className="App">
            {todoListElement}
        </div>
    );
}

export default App;
