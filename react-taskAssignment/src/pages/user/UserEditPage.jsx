import { useForm } from "react-hook-form";
import { useUsers } from "../../context/UsersContext";
import { useEffect } from "react";

function UserEditPage({ user, onClose, refreshUsers }) {
  // Initialize form with validation and default values
  const {
    register,
    handleSubmit,
    setValue, // Used to preload form values
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      rolId: user.rolId,
      password: "", // Password left blank by default for user to input if necessary
    },
  });

  // Function to update the user and handle errors
  const { updateUser, errors: userErrors } = useUsers();

  // Preload form values when the component is mounted
  useEffect(() => {
    if (user) {
      setValue("id", user.id);
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("rolId", user.rolId);
      setValue("password", ""); // Leave blank to let the user change password if needed
    }
  }, [user, setValue]);

  // Handle form submission to update the user
  const onSubmit = handleSubmit(async (data) => {
    const res = await updateUser(data);
    if (res.success === true) {
      refreshUsers(); // Refresh user list after successful update
      onClose(); // Close the modal after saving changes
    }
  });

  return (
    <div className="p-4 md:p-8 bg-zinc-900 rounded-md shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Edit User
      </h2>

      {/* Display errors related to updating the user */}
      {userErrors.length > 0 && (
        <div className="bg-red-500 text-white text-center p-2 rounded mb-4">
          {userErrors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Input for First Name */}
        <div>
          <label className="block text-white mb-2">First Name</label>
          <input
            type="text"
            {...register("firstName", { required: "First Name is required" })}
            className="w-full p-2 rounded bg-zinc-700 text-white"
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        {/* Input for Last Name */}
        <div>
          <label className="block text-white mb-2">Last Name</label>
          <input
            type="text"
            {...register("lastName", { required: "Last Name is required" })}
            className="w-full p-2 rounded bg-zinc-700 text-white"
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        {/* Input for Email */}
        <div>
          <label className="block text-white mb-2">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 rounded bg-zinc-700 text-white"
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Input for Password */}
        <div>
          <label className="block text-white mb-2">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 rounded bg-zinc-700 text-white"
            placeholder="Enter new password (leave blank to keep current)"
          />
        </div>

        {/* Dropdown for Role */}
        <div>
          <label className="block text-white mb-2">Role</label>
          <select
            className="w-full p-2 rounded bg-zinc-700 text-white"
            {...register("rolId", { required: "Role is required" })}
          >
            <option value="">Select a role</option>
            <option value="1">Administrator</option>
            <option value="2">Supervisor</option>
            <option value="3">Employee</option>
          </select>
          {errors.rolId && (
            <p className="text-red-500">{errors.rolId.message}</p>
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
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UserEditPage;
