import { useState, useEffect } from "react";
import { useUsers } from "../../context/UsersContext";
import UserCreatePage from "./UserCreatePage";
import UserEditPage from "./UserEditPage"; // Import the component for editing

function UsersPage() {
  // Fetch users data from context and manage state for modals and errors
  const { getUsers, users, deleteUser } = useUsers();
  const [showForm, setShowForm] = useState(false); // Modal for user creation
  const [showEditForm, setShowEditForm] = useState(false); // Modal for editing
  const [userToEdit, setUserToEdit] = useState(null); // Store the user to be edited
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal for delete confirmation
  const [userToDelete, setUserToDelete] = useState(null); // Store the user to be deleted
  const [error, setError] = useState(null); // Store the error from deletion
  const [showErrorModal, setShowErrorModal] = useState(false); // Modal to display errors

  // Fetch users data when the component is mounted
  useEffect(() => {
    getUsers();
  }, []);

  // Handle the deletion of a user and manage errors if deletion fails
  const handleDelete = async () => {
    try {
      const res = await deleteUser(userToDelete.id);
      if (!res.success) {
        throw new Error(res.errors);
      }
      getUsers();
      setShowDeleteModal(false); // Close the confirmation modal
    } catch (err) {
      setError(err.message); // Set the error message
      setShowDeleteModal(false); // Close the delete modal
      setShowErrorModal(true); // Open the error modal
    }
  };

  // Open the delete confirmation modal
  const openDeleteModal = (user) => {
    setUserToDelete(user); // Store the user to be deleted
    setShowDeleteModal(true); // Open the confirmation modal
  };

  // Open the form modal for creating a new user
  const handleOpenForm = () => {
    setShowForm(true); // Open the creation modal
  };

  // Close the form modal for user creation
  const handleCloseForm = () => {
    setShowForm(false); // Close the creation modal
  };

  // Open the form modal for editing a user
  const handleOpenEditForm = (user) => {
    setUserToEdit(user); // Set the user to be edited
    setShowEditForm(true); // Open the edit modal
  };

  // Close the edit form modal
  const handleCloseEditForm = () => {
    setShowEditForm(false); // Close the edit modal
    setUserToEdit(null); // Clear the selected user for editing
  };

  // Get the role name based on its ID
  const getRoleName = (rolId) => {
    switch (rolId) {
      case 1:
        return "Administrator";
      case 2:
        return "Supervisor";
      case 3:
        return "Employee";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="p-4 md:p-10 bg-zinc-900 min-h-screen relative">
      {/* Button to create a new user */}
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Users Management
        </h1>
        <button
          onClick={handleOpenForm}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Create User
        </button>
      </div>

      {/* User table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-white">
          <thead>
            <tr className="bg-zinc-700">
              <th className="px-2 md:px-4 py-2">First Name</th>
              <th className="px-2 md:px-4 py-2">Last Name</th>
              <th className="px-2 md:px-4 py-2">Email</th>
              <th className="px-2 md:px-4 py-2">Password</th>
              <th className="px-2 md:px-4 py-2">Role</th>
              <th className="px-2 md:px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="bg-zinc-800 hover:bg-zinc-700">
                <td className="border px-2 md:px-4 py-2">{user.firstName}</td>
                <td className="border px-2 md:px-4 py-2">{user.lastName}</td>
                <td className="border px-2 md:px-4 py-2">{user.email}</td>
                <td className="border px-2 md:px-4 py-2">********</td>
                <td className="border px-2 md:px-4 py-2">
                  {getRoleName(user.rolId)}
                </td>
                <td className="border px-2 md:px-4 py-2 flex justify-around space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-2 md:px-4 py-2 rounded hover:bg-yellow-600 transition duration-200"
                    onClick={() => handleOpenEditForm(user)} // Open the edit modal
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 md:px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                    onClick={() => openDeleteModal(user)} // Open the delete confirmation modal
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for creating a user */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <UserCreatePage onClose={handleCloseForm} refreshUsers={getUsers} />
            <button
              onClick={handleCloseForm}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for editing a user */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <UserEditPage
              user={userToEdit}
              onClose={handleCloseEditForm}
              refreshUsers={getUsers}
            />
            <button
              onClick={handleCloseEditForm}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mt-4"
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
              Are you sure you want to delete the user{" "}
              <strong>
                {userToDelete?.firstName} {userToDelete?.lastName}
              </strong>
              ?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)} // Close the modal
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete} // Confirm the deletion
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for displaying errors */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
            <p className="text-white mb-4">{error}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowErrorModal(false)} // Close the modal
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;
