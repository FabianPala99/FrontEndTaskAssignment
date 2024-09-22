import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, singin, errors: siningErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    singin(data);
  });

  useEffect(() => {
    if (isAuthenticated && user?.roleName === "Administrator") {
      navigate("/users");
    }
    if (
      isAuthenticated &&
      (user?.roleName === "Supervisor" || user?.roleName === "Employee")
    ) {
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate, user?.roleName]);

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-900">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md shadow-lg">
        {/* Mostrar los errores solo si existen */}
        {siningErrors.length > 0 && (
          <div className="bg-red-500 text-white text-center py-2 mb-4 rounded-md">
            {/* Muestra cada error si es un array */}
            {siningErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h1>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Input para Email */}
          <div>
            <label htmlFor="email" className="text-white block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Input para Password */}
          <div>
            <label htmlFor="password" className="text-white block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
          </div>

          {/* Botón de Login */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
