import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import ModalCreateCategory from "../categories/ModalCreateCategory";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesSelector } from "../../features/categories/selectors";
import { formatDate } from "../../utils/functionsTools";
import { createOperationThunk, getOperationsThunk } from "../../features/operations/operationsSlice";
import { toast } from "react-toastify";
import { getAccountsSelector } from "../../features/accountsMoney/selectors";
import ModalCreateAccountMoney from "../accountsMoney/ModalCreateAccountMoney";
import { searchOperationsByDate } from "./controller";
import { getDateRangeSelector } from "../../features/ui/selectors";
function ModalCreateOperation() {
  const categories = useSelector(getCategoriesSelector);
  const [openModal, setOpenModal] = useState(false);
  const dateRange = useSelector(getDateRangeSelector)
  const [startDate, setStartDate] = useState(new Date());
  const accountsMoneyList = useSelector(getAccountsSelector);
  const InputDateOperation = forwardRef(({ value, onClick }, ref) => (
    <input
      type="text"
      value={value}
      id="last_name"
      onClick={onClick}
      name="dateinout"
      ref={ref}
      className="bg-gray-50 border border-gray-300 text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Doe"
      required
    />
  ));

  InputDateOperation.displayName = "test";

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();

  async function onSubmit(data) {
    
    try {
      const date_operation=formatDate(data.date_operation)
    const newOperation={...data,date_operation,quantity:Number(data.quantity)}
      const response = await dispatch(createOperationThunk(newOperation))
      const {payload}=response
      if (payload && payload.success) {
        
        setOpenModal(false)
        toast.success('Operacion exitosa!!')
        searchOperationsByDate(dateRange,dispatch)

      }

    } catch (error) {
      toast.error(error.message)
    }
    
    
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Crear</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Crear Operacion</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tipo
                </label>
                <select
                  id="type_operation"
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("type_operation", { required: true })}
                >
                  <option value="" selected>
                    Seleccione
                  </option>
                  <option value="IN">ENTRADA</option>
                  <option value="OUT">SALIDA</option>
                </select>
                {errors.type_operation && (
                  <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                    Esate Campo es obligatorio
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Monto
                </label>
                <input  type="number" step=".01" id="quantity" className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0"  {...register("quantity", { required: true })} />
                {errors.quantity && (
                  <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                    Esate Campo es obligatorio
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Fecha Operacion
                </label>
                <Controller
                  defaultValue={startDate}
                  name="date_operation"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      customInput={<InputDateOperation></InputDateOperation>}
                    />
                  )}
                />
                {errors.date_operation && (
                  <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                    Esate Campo es obligatorio
                  </p>
                )}
              </div>
              <div className="flex items-end gap-4">
                <div className="w-full">
                <label
                  htmlFor="id_type_category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Categoria
                </label>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="id_type_category"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <select
                        id="id_type_category"
                        value={value}
                        className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={onChange}
                      >
                        <option value="" selected>
                          Selecciona
                        </option>
                        {categories.map((category) => {
                          return (
                            <option
                              key={crypto.randomUUID()}
                              value={category.id}
                            >
                              {category.name}
                            </option>
                          );
                        })}
                      </select>
                    )}
                  />
                  {errors.id_type_category && (
                    <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                      Esate Campo es obligatorio
                    </p>
                  )}
                </div>
                <ModalCreateCategory></ModalCreateCategory>
              </div>
              <div>
                <label
                  htmlFor="state_operation"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Estado
                </label>
                <select
                  id="state_operation"
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("state_operation", { required: true })}
                >
                  <option value="">Seleccione</option>
                  <option value="DONE">REALIZADO</option>
                  <option value="PENDING">PENDIENTE</option>
                </select>
                {errors.state_operation && (
                  <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                    Esate Campo es obligatorio
                  </p>
                )}
              </div>
              <div className="flex items-end gap-4 ">
                <div className="w-full">
                <label
                  htmlFor="id_account_money"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cuenta
                </label>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="id_account_money"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <select
                        id="id_account_money"
                        value={value}
                        className="bg-gray-50   outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={onChange}
                      >
                        <option value="" selected>
                          Selecciona
                        </option>
                        {accountsMoneyList.map((account) => {
                          return (
                            <option
                              key={crypto.randomUUID()}
                              value={account.id}
                            >
                              {account.name}
                            </option>
                          );
                        })}
                      </select>
                    )}
                  />
                  {errors.id_account_money && (
                  <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                    Esate Campo es obligatorio
                  </p>
                )}
                </div>
                 <ModalCreateAccountMoney></ModalCreateAccountMoney>     
                
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Descripcion
              </label>
              <input
                type="text"
                id="description"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@company.com"
                {...register("description", { required: true })}
              />
              {errors.description && (
                  <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                    Esate Campo es obligatorio
                  </p>
                )}
            </div>
            <div className="flex gap-4">
              <Button type="submit">Enviar</Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalCreateOperation;
