import type { LoaderFunctionArgs } from "react-router-dom";
import {
  Form,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import { fakeAuthProvider } from "./auth";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { NewInvoice } from "./pages/NewInvoice";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      // Our root route always provides the user, if logged in
      return { user: fakeAuthProvider.username };
    },
    Component: Layout,
    children: [
      {
        path: "login",
        action: loginAction,
        loader: loginLoader,
        Component: LoginPage,
      },
      {
        path: "summary",
        loader: protectedLoader,
        Component: Home,
      },
      {
        path: "new",
        loader: protectedLoader,
        Component: NewInvoice,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      await fakeAuthProvider.signout();
      return redirect("/");
    },
  },
]);

export default function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<p>Initial Load...</p>}
    />
  );
}

async function loginAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string | null;

  if (!username) {
    return {
      error: "You must provide a username to log in",
    };
  }

  try {
    await fakeAuthProvider.signin(username);
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // username/password combinations - just like validating the inputs
    // above
    return {
      error: "Invalid login attempt",
    };
  }

  const redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || "/");
}

async function loginLoader() {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

function LoginPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "/";

  const navigation = useNavigation();
  const isLoggingIn = navigation.formData?.get("username") != null;

  const actionData = useActionData() as { error: string } | undefined;

  return (
    <div className="flex flex-col w-full">
      <Form
        method="post"
        replace
        className="flex flex-col"
      >
        <div className="flex flex-col max-w-md w-full self-center py-32">
        <div className="mb-16 text-2xl">Iniciar Sesión</div>
          <input
            type="hidden"
            name="redirectTo"
            value={from}
          />
          <label>
            Nombre de Usuario: <Input name="username" />
          </label>
          <Button
            className="mt-12"
            type="submit"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Iniciando Sesión..." : "Iniciar Sesión"}
          </Button>
          {actionData && actionData.error ? (
            <p style={{ color: "red" }}>{actionData.error}</p>
          ) : null}
        </div>
      </Form>
    </div>
  );
}

function protectedLoader({ request }: LoaderFunctionArgs) {
  if (!fakeAuthProvider.isAuthenticated) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}
