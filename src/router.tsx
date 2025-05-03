import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import PorfileLayout from "./layouts/PorfileLayout";
import NotFound from "./views/404/NotFound";

// Lazy-loaded views
const DashboardView = lazy(() => import("./views/DashboardView"));
const CreateProjectView = lazy(
  () => import("./views/projects/CreateProjectView")
);
const EditProjectView = lazy(() => import("./views/projects/EditProjectView"));
const ProjectDetailsView = lazy(
  () => import("./views/projects/ProjectDetailsView")
);
const ProjectTeamView = lazy(() => import("./views/projects/ProjectTeamView"));
const PorfileView = lazy(() => import("./views/porfile/PorfileView"));
const ChangePasswordView = lazy(
  () => import("./views/porfile/ChangePasswordView")
);

const LoginView = lazy(() => import("./views/auth/LoginView"));
const RegisterView = lazy(() => import("./views/auth/RegisterView"));
const ConfirmAccountView = lazy(
  () => import("./views/auth/ConfirmAccountView")
);
const RequestNewCodeView = lazy(
  () => import("./views/auth/RequestNewCodeView")
);
const ForgotPasswordView = lazy(() => import("./views/auth/ForgotPassword"));
const NewPasswordView = lazy(() => import("./views/auth/NewPasswordView"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardView />} index />
            <Route
              path="/project/create"
              element={<CreateProjectView />}
              index
            />
            <Route
              path="/project/:projectId/edit"
              element={<EditProjectView />}
              index
            />
            <Route
              path="/project/:projectId"
              element={<ProjectDetailsView />}
              index
            />
            <Route
              path="/project/:projectId/team"
              element={<ProjectTeamView />}
              index
            />
            <Route element={<PorfileLayout />}>
              <Route path="/profile" element={<PorfileView />} />
              <Route
                path="/profile/password"
                element={<ChangePasswordView />}
              />
            </Route>
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginView />} />
            <Route path="/auth/register" element={<RegisterView />} />
            <Route
              path="/auth/confirm-account"
              element={<ConfirmAccountView />}
            />
            <Route path="/auth/resend-code" element={<RequestNewCodeView />} />
            <Route
              path="/auth/forgot-password"
              element={<ForgotPasswordView />}
            />
            <Route path="/auth/new-password" element={<NewPasswordView />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
