import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getDateRangeSelector,
  getUiOperationsSelector,
} from "../../features/ui/selectors";
import { showModalUpdateOperationReducer } from "../../features/ui/uiSlice";
import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { getAccountsSelector } from "../../features/accountsMoney/selectors";
import { getCategoriesSelector } from "../../features/categories/selectors";
import ModalCreateCategory from "../categories/ModalCreateCategory";
import ModalCreateAccountMoney from "../accountsMoney/ModalCreateAccountMoney";
import { getOperationSelected } from "../../features/operations/selectors";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/functionsTools";
import {
  getOperationsThunk,
  updateOperationThunk,
} from "../../features/operations/operationsSlice";
import { searchOperationsByDate } from "./controller";

function ModalUpdateOperation() {
  const operationsUiState = useSelector(getUiOperationsSelector);
  const categories = useSelector(getCategoriesSelector);
  const { showModalUpdateOperation } = operationsUiState;
  const operationSelected = useSelector(getOperationSelected);
  const dateRange = useSelector(getDateRangeSelector);
  const [startDate, setStartDate] = useState(new Date());
  const accountsMoneyList = useSelector(getAccountsSelector);
  const InputDateOperation = forwardRef(({ value, onClick }, ref) => (
    <input
      type="text"
      value={value}
      id="date_operation"
      onClick={onClick}
      name="dateinout"
      ref={ref}
      className="bg-gray-50 border border-gray-300 text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Doe"
      required
    />
  ));

  InputDateOperation.displayName = "date_operation";
  const {
    register,
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();

  async function onSubmit(data) {
    try {
      const { id } = operationSelected;
      const date_operation = formatDate(data.date_operation);
      const updatedOperation = { ...data, id, date_operation };
      const response = await dispatch(updateOperationThunk(updatedOperation));
      const { payload } = response;
      if (payload && payload.status) {
        toast.success("Operacion actualizada!!");
        dispatch(showModalUpdateOperationReducer(false));
        await dispatch(getOperationsThunk({}));
        searchOperationsByDate(dateRange, dispatch);
      } else {
        const { error } = response;
        throw new Error(error.message || "Algo salio mal !!!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    setValue("type_operation", operationSelected.type_operation || "");
    setValue("state_operation", operationSelected.state_operation || "");
    setValue("quantity", operationSelected.quantity);
    setValue(
      "date_operation",
      operationSelected.date_operation
        ? new Date(operationSelected.date_operation)
        : new Date()
    );
    setValue("description", operationSelected.description || "");

    setValue("id_type_category", operationSelected.id_type_category || "");
    setValue("id_account_money", operationSelected.id_account_money || "");
  }, [operationSelected]);

  return (
    <>
      <Modal
        show={showModalUpdateOperation}
        onClose={() => dispatch(showModalUpdateOperationReducer(false))}
      >
        <Modal.Header>Actualizar Operacion</Modal.Header>
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
                <input
                  type="number"
                  step=".01"
                  id="quantity"
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  {...register("quantity", { required: true })}
                />
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
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name={"state_operation"}
                  render={() => (
                    <select
                      id="state_operation"
                      className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("state_operation", { required: true })}
                    >
                      <option value="">Seleccione</option>
                      <option value="DONE">REALIZADO</option>
                      <option value="PENDING">PENDIENTE</option>
                    </select>
                  )}
                />

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
                    name={"id_account_money"}
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
              <Button
                color="gray"
                onClick={() => dispatch(showModalUpdateOperationReducer(false))}
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

export default ModalUpdateOperation;
