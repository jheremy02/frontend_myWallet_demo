import React from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loadingCategorySelector } from "../../features/categories/selectors";
import { createCategoryThunk, getCategoriesThunk } from "../../features/categories/categoriesSlice";
import { root } from "postcss";
import Loading from "../Loading";
import { getStateUiCategories } from "../../features/ui/selectors";

function ModalCreateCategory() {
  const [openModal, setOpenModal] = useState(false);
  
  const isLoading=useSelector(loadingCategorySelector)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch=useDispatch()
  async function onSubmit(data,e) {

    e.nativeEvent.stopPropagation();
    // your code
    
    try {
      const newCategory={

        name:data.name_category,
        type_operation:data.type_category

      }

      const response = await dispatch(createCategoryThunk(newCategory))
      const {payload}=response

      if (payload && payload.success) {
        
        setOpenModal(false)
        dispatch(getCategoriesThunk({}))

      }

    } catch (error) {
      toast.error(error.message)
    }

    
    
  }

  return (
    <>
      <Button size={'xs'}c className="h-12" onClick={() => setOpenModal(true)}>Crear</Button>
      <Modal
        
        show={openModal}
        onClose={() => setOpenModal( isLoading || false)}
        size={"sm"}
      >
        <Modal.Header  >Crear Categoria</Modal.Header>
        <Modal.Body>
        {isLoading ? (
            <Loading></Loading>
          ) : (
            ""
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                htmlFor="name_category"
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
              {errors.name_category && <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                    Esate Campo es obligatorio
                  </p>}
            </div>
            
            <div className="flex gap-3 justify-end">
              <Button type={"button"} disabled={isLoading || false} onClick={handleSubmit(onSubmit)}>Guardar</Button>
              <Button color="gray" onClick={() => setOpenModal(false)} disabled={isLoading || false}>
                Cancelar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
/*
  <div className="mb-6">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Seleccione
              </label>
              <select
                id="type_category"
                className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("type_category", { required: true })}
              >
                <option value="" selected>Selecciona</option>
                <option value="IN">ENTRADA</option>
                <option value="OUT">SALIDA</option>
              </select>
              {errors.type_category && <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                    Esate Campo es obligatorio
                  </p>}
            </div>
*/
export default ModalCreateCategory;
