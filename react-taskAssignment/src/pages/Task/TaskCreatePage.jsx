import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../../context/TasksContext";
import { useUsers } from "../../context/UsersContext";

function TaskCreatePage({ onClose, refreshTasks }) {
  // Initialize the form with validation
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }, // `isValid` will help enable/disable the submit button based on form validation
  } = useForm({
    mode: "onChange", // Validate in real-time to enable/disable the submit button
  });

  const { createTask, errors: taskErrors } = useTasks();
  const {
    getSupervisoryUsers,
    supervisoryUsers,
    getEmployedUsers,
    employedUsers,
  } = useUsers();

  // Fetch the list of supervisory and employed users on component mount
  useEffect(() => {
    getSupervisoryUsers();
    getEmployedUsers();
  }, []);

  // Form submission handler to create a new task
  const onSubmit = handleSubmit(async (data) => {
    const res = await createTask(data);
    if (res.success === true) {
      refreshTasks();
      onClose(); // Close the modal or form once the task is created
    }
  });

  return (
    <div className="p-4 md:p-8 bg-zinc-900 rounded-md shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Create New Task
      </h2>

      {/* Display task creation errors if any */}
      {taskErrors.length > 0 && (
        <div className="bg-red-500 text-white text-center p-2 rounded mb-4">
          {taskErrors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      {/* Task creation form */}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Input for Task Name */}
        <div>
          <label className="block text-white mb-2">Task Name</label>
          <input
            type="text"
            {...register("name", { required: "Task Name is required" })}
            className="w-full p-2 rounded bg-zinc-700 text-white"
            placeholder="Enter task name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Input for Task Description */}
        <div>
          <label className="block text-white mb-2">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full p-2 rounded bg-zinc-700 text-white"
            placeholder="Enter task description"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Dropdown for Task Status */}
        <div>
          <label className="block text-white mb-2">Status</label>
          <select
            className="w-full p-2 rounded bg-zinc-700 text-white"
            {...register("status", { required: "Status is required" })}
          >
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && (
            <p className="text-red-500">{errors.status.message}</p>
          )}
        </div>

        {/* Dropdown for Assigned Employee */}
        <div>
          <label className="block text-white mb-2">Employee</label>
          <select
            className="w-full p-2 rounded bg-zinc-700 text-white"
            {...register("assignedToUserId", {
              required: "Employee is required",
            })}
          >
            <option value="">Select an employee</option>
            {employedUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
          {errors.assignedToUserId && (
            <p className="text-red-500">{errors.assignedToUserId.message}</p>
          )}
        </div>

        {/* Dropdown for Assigned Supervisor */}
        <div>
          <label className="block text-white mb-2">Supervisor</label>
          <select
            className="w-full p-2 rounded bg-zinc-700 text-white"
            {...register("assignedByUserId", {
              required: "Supervisor is required",
            })}
          >
            <option value="">Select a supervisor</option>
            {supervisoryUsers.map((supervisor) => (
              <option key={supervisor.id} value={supervisor.id}>
                {supervisor.firstName} {supervisor.lastName}
              </option>
            ))}
          </select>
          {errors.assignedByUserId && (
            <p className="text-red-500">{errors.assignedByUserId.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white px-4 py-2 rounded ${
            !isValid ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={!isValid} // Disable the button if the form is not valid
        >
          Create Task
        </button>
      </form>
    </div>
  );
}

export default TaskCreatePage;
