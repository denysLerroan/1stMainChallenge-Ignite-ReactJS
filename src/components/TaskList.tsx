import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare, FiDelete } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedItemsLabel, setSelectedItemsLabel] =
    useState("Select all items");

  function handleCreateNewTask() {
    if (!newTaskTitle) {
      return window.alert("Insira um titulo válido!");
    }

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    const isComplete = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isComplete: !task.isComplete,
          }
        : task
    );

    setTasks(isComplete);
  }

  function handleRemoveTask(id: number) {
    const removeTask = tasks.filter((task) => task.id !== id);
    setTasks(removeTask);
  }

  function handleDeleteSelectedItems() {
    const selectedItems = tasks.filter((task) => task.isComplete === false);
    setTasks(selectedItems);
  }

  function handleSelectAllItems() {
    if (!tasks.length) {
      return;
    }
    if (selectedItemsLabel === "Select all items") {
      setSelectedItemsLabel("Deselect group");
    } else if (selectedItemsLabel === "Deselect group") {
      setSelectedItemsLabel("Select all items");
    }

    const selectedItems = tasks.map((task) =>
      task.isComplete === false || true
        ? {
            ...task,
            isComplete: !task.isComplete,
          }
        : task
    );
    setTasks(selectedItems);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#ffffff" />
          </button>
        </div>
      </header>

      <section className="tool-bar">
        <div className="tool-selectItems">
          <input type="checkbox" id="teste" onClick={handleSelectAllItems} />
          <label htmlFor="teste">{selectedItemsLabel}</label>
        </div>
        <button type="submit" onClick={handleDeleteSelectedItems}>
          <FiDelete size={16} color="#d33838" />
          Delete selected items
        </button>
      </section>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
