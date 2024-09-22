import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTasks } from "../../context/TasksContext";
import { useUsers } from "../../context/UsersContext";
import TaskCreatePage from "./TaskCreatePage";
import TaskEditPage from "./TaskEditPage";

function TasksPage() {
  const { user, loading } = useAuth();
  const {
    getTasks,
    tasks,
    deleteTask,
    getTasksByEmployed,
    getTasksBySupervisory,
  } = useTasks();
  const { getByIdUser, userId } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, settaskToDelete] = useState(null);

  // Wait for authentication state to be ready
  useEffect(() => {
    if (loading) return;

    if (user?.roleName === "Administrator") {
      getTasks();
    }
    if (user?.roleName === "Supervisor") {
      getTasksBySupervisory(user?.userId);
    }
    if (user?.roleName === "Employee") {
      getTasksByEmployed(user?.userId);
    }
  }, [loading, user]);

  // Handle task deletion
  const handleDelete = async () => {
    await deleteTask(taskToDelete.id);
    if (user?.roleName === "Administrator") {
      getTasks();
    }
    if (user?.roleName === "Supervisor") {
      getTasksBySupervisory(user?.userId);
    }
    if (user?.roleName === "Employee") {
      getTasksByEmployed(user?.userId);
    }
    setShowDeleteModal(false);
  };

  // Open delete confirmation modal
  const openDeleteModal = (task) => {
    settaskToDelete(task);
    setShowDeleteModal(true);
  };

  // Open task creation form
  const handleOpenForm = () => {
    setShowForm(true);
  };

  // Close task creation form
  const handleCloseForm = () => {
    setShowForm(false);
  };

  // Open task edit form
  const handleOpenEditForm = (task) => {
    setTaskToEdit(task);
    setShowEditForm(true);
  };

  // Close task edit form
  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setTaskToEdit(null);
  };

  // Show loading message while authentication is being checked
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 sm:p-10 bg-zinc-900 min-h-screen relative">
      <div className="flex flex-col sm:flex-row justify-between mb-5">
        <h1 className="text-3xl font-bold text-white">Tasks Management</h1>
        {user?.roleName !== "Employee" && user?.roleName !== "Supervisor" && (
          <button
            onClick={handleOpenForm}
            className="mt-2 sm:mt-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Create Task
          </button>
        )}
      </div>

      {/* Responsive table container */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-white">
          <thead>
            <tr className="bg-zinc-700">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Employee</th>
              <th className="px-4 py-2">Supervisor</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="bg-zinc-800 hover:bg-zinc-700">
                <td className="border px-4 py-2">{task.name}</td>
                <td className="border px-4 py-2">{task.description}</td>
                <td className="border px-4 py-2">{task.status}</td>
                <td className="border px-4 py-2">{task.assignedToUserName}</td>
                <td className="border px-4 py-2">{task.assignedByUserName}</td>
                <td className="border px-4 py-2">
                  <div className="flex flex-col sm:flex-row justify-around space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                      onClick={() => handleOpenEditForm(task)}
                    >
                      Edit
                    </button>
                    {user?.roleName !== "Supervisor" &&
                      user?.roleName !== "Employee" && (
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                          onClick={() => openDeleteModal(task)}
                        >
                          Delete
                        </button>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for creating a task */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <TaskCreatePage onClose={handleCloseForm} refreshTasks={getTasks} />
            <button
              onClick={handleCloseForm}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mt-4 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for editing a task */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <TaskEditPage
              task={taskToEdit}
              onClose={handleCloseEditForm}
              refreshTasks={getTasks}
            />
            <button
              onClick={handleCloseEditForm}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mt-4 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for delete confirmation */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-4">
              Confirm Deletion
            </h2>
            <p className="text-white mb-4">
              Are you sure you want to delete the task{" "}
              <strong>{taskToDelete?.name}</strong>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TasksPage;
