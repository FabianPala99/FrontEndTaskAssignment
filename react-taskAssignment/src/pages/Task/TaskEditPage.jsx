import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../../context/TasksContext";
import { useAuth } from "../../context/AuthContext";
import { useUsers } from "../../context/UsersContext";

function TaskEditPage({ task, onClose, refreshTasks }) {
  // Initializing form with validation and default values
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Enable real-time validation to activate/deactivate the submit button
    defaultValues: {
      name: task.name,
      description: task.description,
      status: task.status,
      assignedToUserId: task.assignedToUserId,
      assignedByUserId: task.assignedByUserId,
    },
  });

  const { updateTask, errors: taskErrors } = useTasks();
  const {
    getSupervisoryUsers,
    supervisoryUsers,
    getEmployedUsers,
    employedUsers,
  } = useUsers();
  const { user } = useAuth(); // Get the current user

  // Load users when the component mounts
  useEffect(() => {
    getSupervisoryUsers();
    getEmployedUsers();
  }, []);

  // Preload task data when a task is passed to the component
  useEffect(() => {
    if (task) {
      setValue("id", task.id);
      setValue("name", task.name);
      setValue("description", task.description);
      setValue("status", task.status);
      setValue("assignedToUserId", task.assignedToUserId);
      setValue("assignedByUserId", task.assignedByUserId);
    }
  }, [task, setValue]);

  // Handle form submission for updating the task
  const onSubmit = handleSubmit(async (data) => {
    const res = await updateTask(data);
    if (res.success === true) {
      refreshTasks();
      onClose();
    }
  });

  return (
    <div className="p-4 md:p-8 bg-zinc-900 rounded-md shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Edit Task
      </h2>

      {/* Display task update errors if any */}
      {taskErrors.length > 0 && (
        <div className="bg-red-500 text-white text-center p-2 rounded mb-4">
          {taskErrors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      {/* Form for editing task */}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Input for Task Name */}
        <div>
          <label className="block text-white mb-2">Task Name</label>
          <input
            type="text"
            {...register("name", { required: "Task Name is required" })}
            className="w-full p-2 rounded bg-zinc-700 text-white"
            placeholder="Enter task name"
            disabled={
              user?.roleName === "Supervisor" || user?.roleName === "Employee"
            } // Disabled for Supervisor and Employee
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
            disabled={
              user?.roleName === "Supervisor" || user?.roleName === "Employee"
            } // Disabled for Supervisor and Employee
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
            disabled={false} // All roles can modify status
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

        {/* Dropdown for Employee */}
        <div>
          <label className="block text-white mb-2">Employee</label>
          <select
            className="w-full p-2 rounded bg-zinc-700 text-white"
            {...register("assignedToUserId", {
              required: "Employee is required",
            })}
            disabled={user?.roleName === "Employee"} // Disabled for Employee
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

        {/* Dropdown for Supervisor */}
        <div>
          <label className="block text-white mb-2">Supervisor</label>
          <select
            className="w-full p-2 rounded bg-zinc-700 text-white"
            {...register("assignedByUserId", {
              required: "Supervisor is required",
            })}
            disabled={
              user?.roleName === "Supervisor" || user?.roleName === "Employee"
            } // Disabled for Supervisor and Employee
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
          disabled={!isValid} // Disable button if form is not valid
        >
          Update Task
        </button>
      </form>
    </div>
  );
}

export default TaskEditPage;
