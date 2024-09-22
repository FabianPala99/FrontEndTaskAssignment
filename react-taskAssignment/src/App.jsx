import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/user/UsersPage";
import TasksPage from "./pages/Task/TasksPage";
import ProtectedRoutes from "./ProtectedRoute";
import { TaskProvider } from "./context/TasksContext";
import { UserProvider } from "./context/UsersContext";
import { RolProvider } from "./context/RolesContext";
import Navbar from "./components/Navbar";
import NotFoundRedirect from "./components/NotFoundRedirect"; // Importar el componente de redirección

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <UserProvider>
          <RolProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route
                  element={<ProtectedRoutes allowedRoles={["Administrator"]} />}
                >
                  <Route path="/users" element={<UsersPage />} />
                </Route>

                <Route
                  element={
                    <ProtectedRoutes
                      allowedRoles={["Administrator", "Supervisor", "Employee"]}
                    />
                  }
                >
                  <Route path="/tasks" element={<TasksPage />} />
                </Route>

                {/* Ruta para capturar rutas no definidas */}
                <Route path="*" element={<NotFoundRedirect />} />
              </Routes>
            </BrowserRouter>
          </RolProvider>
        </UserProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
