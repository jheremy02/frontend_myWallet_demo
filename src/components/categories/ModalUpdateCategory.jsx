import React, { useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  categorySelectedSelector,
  loadingCategorySelector,
} from "../../features/categories/selectors";
import {
  createCategoryThunk,
  getCategoriesThunk,
  updateCategoryThunk,
} from "../../features/categories/categoriesSlice";
import { root } from "postcss";
import Loading from "../Loading";
import { getStateUiCategories } from "../../features/ui/selectors";
import { showModalUpdateReducer } from "../../features/ui/uiSlice";
import { connect } from "react-redux";

function ModalUpdateCategory() {
  const [openModal, setOpenModal] = useState(false);
  const stateUiCategories = useSelector(getStateUiCategories);
  const categorySelected = useSelector(categorySelectedSelector);
 
  const { showModalUpdate } = stateUiCategories;
  const isLoading = useSelector(loadingCategorySelector);
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  async function onSubmit(data) {
    try {
      const updatedCategory = {
        ...categorySelected,
        name: data.name_category,
        type_operation: data.type_category,
      };

      const response = await dispatch(updateCategoryThunk(updatedCategory));
      if (response.payload && response.payload.success) {
        dispatch(showModalUpdateReducer(false))
        dispatch(getCategoriesThunk({}))
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    setValue("name_category", categorySelected.name);
    setValue("type_category", categorySelected.type_operation);
  }, [categorySelected]);

  return (
    <>
      <Modal
        show={showModalUpdate}
        onClose={() => dispatch(showModalUpdateReducer(isLoading||false))}
        size={"sm"}
      >
        <Modal.Header>Actualizar Categoria</Modal.Header>
        <Modal.Body>
          {isLoading ? <Loading></Loading> : ""}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                htmlFor="name_category_update"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name_category"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@company.com"
                {...register("name_category", { required: true })}
              />
              {errors.name_category && (
                <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                  Esate Campo es obligatorio
                </p>
              )}
            </div>
            <div className="mb-6">
              <Controller
              
                control={control}
                rules={{required:true}}
                name="type_category"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <select
                    id="type_category"
                    value={value}
                    className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={onChange}
                  >
                    <option value="" selected>
                      Selecciona
                    </option>
                    <option value="IN">ENTRADA</option>
                    <option value="OUT">SALIDA</option>
                  </select>
                )}
              />

             
              
              {errors.type_category && (
                <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                  Esate Campo es obligatorio
                </p>
              )}
            </div>
            <div className="flex gap-3 justify-end">
              <Button type={"submit"} disabled={isLoading || false}>
                Guardar
              </Button>
              <Button
                color="gray"
                onClick={() => dispatch(showModalUpdateReducer(false))}
                disabled={isLoading || false}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalUpdateCategory;
