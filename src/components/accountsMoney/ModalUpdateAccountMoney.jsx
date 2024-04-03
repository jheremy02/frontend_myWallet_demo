import { Button, Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '../Loading';
import { accountMoneySelectedSelector, isLoadingAccountSelector } from '../../features/accountsMoney/selectors';
import { createAccountMoneyThunk, getAccounstMoneyThunk, updateAccountMoneyThunk } from '../../features/accountsMoney/accountMoneySlice';
import { getUiAccountMoneySelector } from '../../features/ui/selectors';
import { showModalUpdateAccountReducer } from '../../features/ui/uiSlice';

function ModalUpdateAccountMoney() {
    const [openModal, setOpenModal] = useState(false);
    const stateUiAccount=useSelector(getUiAccountMoneySelector)
    const {showModalUpdate}=stateUiAccount
    const isLoading=useSelector(isLoadingAccountSelector)
    const accountMoneySelected=useSelector(accountMoneySelectedSelector)
    const {
      register,
      setValue,
      handleSubmit,
      watch,
      formState: { errors, isSubmitting },
    } = useForm();
    const dispatch=useDispatch()
    async function onSubmit(data) {
      try {
        const updatedAccount={
          ...accountMoneySelected,
          ...data
        }
        const response = await dispatch(updateAccountMoneyThunk(updatedAccount))
        const {payload}=response
        
        if (payload && payload.success) {
          
          dispatch(showModalUpdateAccountReducer(false))
          dispatch(getAccounstMoneyThunk({}))
  
        }
  
      } catch (error) {
        toast.error(error.message)
      }
    }

    useEffect(() => {
      setValue("name", accountMoneySelected.name);
      setValue("name_company", accountMoneySelected.name_company);
    }, [accountMoneySelected]);
  
    return (
      <>
        
        <Modal
          
          show={showModalUpdate}
          onClose={() => isLoading?dispatch(showModalUpdateAccountReducer(true)):dispatch(showModalUpdateAccountReducer(false)) }
          size={"sm"}
        >
          <Modal.Header  >Actualizar Cuenta Bancaria</Modal.Header>
          <Modal.Body>
          {isLoading ? (
              <Loading></Loading>
            ) : (
              ""
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label
                  htmlFor="name_update"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre Cuenta
                </label>
                <input
                  type="text"
                  id="name_update"
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john.doe@company.com"
        
                  {...register("name", { required: true })}
                  
                />
                {errors.name && <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                      Esate Campo es obligatorio
                    </p>}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="name_company_update"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre Banco
                </label>
                <input
                  type="text"
                  id="name_company_update"
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john.doe@company.com"
        
                  {...register("name_company", { required: true })}
                  
                />
                {errors.name_company && <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                      Esate Campo es obligatorio
                    </p>}
              </div>
            
              <div className="flex gap-3 justify-end">
                <Button type={"submit"} disabled={isLoading || false}>Guardar</Button>
                <Button color="gray" onClick={() => dispatch(showModalUpdateAccountReducer(false))} disabled={isLoading || false}>
                  Cancelar
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }

export default ModalUpdateAccountMoney