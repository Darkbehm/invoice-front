import { mdiLogout, mdiReceiptTextEdit, mdiReceiptTextOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { NavLink, useFetcher, useRouteLoaderData } from "react-router-dom";

export default function Navbar() {
  // Get our logged in user, if they exist, from the root route loader data
  const { user } = useRouteLoaderData("root") as { user: string | null };
  const fetcher = useFetcher();

  const isLoggingOut = fetcher.formData != null;

  return (
    <nav className="bg-stone-400 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
        <NavLink
          className="flex items-center space-x-3 rtl:space-x-reverse"
          to={"/"}
        >
          <Icon
            path={mdiReceiptTextOutline}
            title="Logo"
            size={1}
            color="black"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Factura.hn
          </span>
        </NavLink>

        {user ? (
          <>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-4">
              <NavLink
                to={"/new"}
                className="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 rounded-lg text-sm px-4 py-2 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800 font-bold flex gap-2"
              >
                <Icon
                  path={mdiReceiptTextEdit}
                  title="nueva factura"
                  size={0.8}
                  color="white"
                />
                Facturar
              </NavLink>

              <fetcher.Form
                method="post"
                action="/logout"
              >
                <button
                  type="submit"
                  className="text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-bold rounded-lg text-sm px-4 py-2 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800 flex gap-2"
                  disabled={isLoggingOut}
                >
                  <Icon
                    path={mdiLogout}
                    title="cerrar sesion"
                    size={0.8}
                    color="white"
                  />
                  {isLoggingOut ? "Cerrando Sesión..." : "Cerrar Sesión"}
                </button>
              </fetcher.Form>
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-cta"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                <li>
                  <NavLink
                    to={"/summary"}
                    className="font-bold block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-rose-600 md:dark:hover:text-rose-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    aria-current="page"
                  >
                    Facturas Recientes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/"}
                    aria-current="page"
                    className="font-bold block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-rose-600 md:dark:hover:text-rose-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Productos
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/"}
                    className="font-bold block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-rose-600 d:dark:hover:text-rose-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Clientes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/"}
                    className="font-bold block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-rose-600 md:dark:hover:text-rose-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Reportes
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <NavLink
              to={"/login"}
              className="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-bold rounded-lg text-sm px-4 py-2 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
            >
              Iniciar Sesión
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
