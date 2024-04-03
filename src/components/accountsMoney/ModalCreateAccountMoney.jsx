import { Button, Modal } from 'flowbite-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '../Loading';
import { isLoadingAccountSelector } from '../../features/accountsMoney/selectors';
import { createAccountMoneyThunk, getAccounstMoneyThunk } from '../../features/accountsMoney/accountMoneySlice';

function ModalCreateAccountMoney() {
    const [openModal, setOpenModal] = useState(false);
    
    const isLoading=useSelector(isLoadingAccountSelector)
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isSubmitting },
    } = useForm();
    const dispatch=useDispatch()
    async function onSubmit(data) {
      try {
        
  
        const response = await dispatch(createAccountMoneyThunk(data))
        const {payload}=response
  
        if (payload && payload.success) {
          
          setOpenModal(false)
          dispatch(getAccounstMoneyThunk({}))
  
        }
  
      } catch (error) {
        toast.error(error.message)
      }
    }
  
    return (
      <>
        <Button className='text-white bg-gradient-to-r max-h-10 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  rounded-lg px-1 py-2 text-sm font-medium text-center' onClick={() => setOpenModal(true)}>Crear</Button>
        <Modal
          
          show={openModal}
          onClose={() => setOpenModal( isLoading || false)}
          size={"sm"}
        >
          <Modal.Header  >Crear Cuenta Bancaria</Modal.Header>
          <Modal.Body>
          {isLoading ? (
              <Loading></Loading>
            ) : (
              ""
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre Cuenta
                </label>
                <input
                  type="text"
                  id="name"
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
                  htmlFor="name_company"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre Banco
                </label>
                <input
                  type="text"
                  id="name_company"
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john.doe@company.com"
        
                  {...register("name_company", { required: true })}
                  
                />
                {errors.name_company && <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                      Esate Campo es obligatorio
                    </p>}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="total_money"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Fondo Inicial
                </label>
                <input
                  min={0}
                  type="number"
                  id="total_money"
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0.00"
        
                  {...register("total_money", { required: true })}
                  
                />
                {errors.name_company && <p className="mt-2 mb-0 text-xs text-red-600 dark:text-red-500">
                      Esate Campo es obligatorio
                    </p>}
              </div>
              <div className="flex gap-3 justify-end">
                <Button type={"submit"} disabled={isLoading || false}>Guardar</Button>
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

export default ModalCreateAccountMoney