import React from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersState } from "../../features/users/selectors";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getRoles } from "../../features/roles/selectors";
import { root } from "postcss";
import { createUserThunk, getUsersThunk } from "../../features/users/usersSlice";
import { toast } from "react-toastify";
import { getRolesThunk } from "../../features/roles/rolesSlice";
const animatedComponents = makeAnimated();
function ModalCreateUser() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(getUsersState);
  const roles = useSelector(getRoles);
  const [openModal, setOpenModal] = useState(false);
  const [rolesSelected, setSelectionRoles] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    try {
      const formData = { ...data, roles: rolesSelected.map(role=>role.value) };
      const response = await dispatch(createUserThunk(formData));
      const {payload}=response
      if (payload && payload.success) {
        setOpenModal(false)
        await  dispatch(getUsersThunk({}))
        await dispatch(getRolesThunk({}))
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Crear Usuario</Button>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        theme={{
          content: {
            inner:
              "relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[1920px]",
          },
        }}
      >
        <Modal.Header>Crear Usuario</Modal.Header>
        <Modal.Body className="h-auto max-h-full">
          {isLoading ? (
            <div className="absolute left-0 top-0 flex items-center justify-center w-full h-full border border-gray-200 rounded-b-lg  bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Cargando...</span>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="p-2">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid gap-6  md:grid-cols-2">
                <div className="">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombres
                  </label>
                  <input
                    disabled={isSubmitting}
                    type="text"
                    id="first_name"
                    className="shadow-sm focus:outline-none  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="first name"
                    {...register("first_name", { required: true })}
                  />
                  {errors.firstName?.type === "required" && (
                    <p className="mt-2 text-xs mb-0 text-red-600 dark:text-red-500">
                      Este campo es requerido.
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Apellidos
                  </label>
                  <input
                    disabled={isSubmitting}
                    type="last_name"
                    id="last_name"
                    className="shadow-sm focus:outline-none  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="name@flowbite.com"
                    {...register("last_name", { required: true })}
                  />
                  {errors.last_name?.type === "required" && (
                    <p className="mt-1 text-xs mb-0 text-red-600 dark:text-red-500">
                      Este campo es requerido.
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="roles"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Roles
                </label>
                <Select
                  onChange={(data) => setSelectionRoles(data)}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={
                    Array.isArray(roles)
                      ? roles.map((role) => {
                          return { value: role.id, label: role.name };
                        })
                      : []
                  }
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  disabled={isSubmitting}
                  type="text"
                  id="email"
                  className="shadow-sm focus:outline-none  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="name@flowbite.com"
                  {...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  })}
                />
                {errors.email?.type === "required" && (
                  <p className="mt-2  mb-0 text-xs text-red-600 dark:text-red-500">
                    Este campo es requerido.
                  </p>
                )}
                {errors.email?.type === "pattern" && (
                  <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                    Ingrese un email valido.
                  </p>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  disabled={isSubmitting}
                  type="password"
                  id="password"
                  className="shadow-sm focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  {...register("password", { required: true })}
                />
                {errors.password?.type === "required" && (
                  <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                    Este campo es requerido.
                  </p>
                )}
              </div>
              <div className="flex gap-3 justify-end">
                <Button type="submit" disabled={isLoading?true:false}>Guardar</Button>
                <Button color="gray" onClick={() => setOpenModal(false)} disabled={isLoading?true:false}>
                  Cerrar
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalCreateUser;
