import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getStateModalDeleteItem } from "../features/ui/selectors";
import { showModalDeleteItemReducer } from "../features/ui/uiSlice";
import { toast } from "react-toastify";

function ModalDeleteItem({ itemSelected, submitThunk, listThunk }) {
  const dispatch = useDispatch();
  const showModalDelete = useSelector(getStateModalDeleteItem);
  const [isLoading, setIsloading] = useState(false);
  async function onDelete() {
    try {
      setIsloading(true);
      const result = await dispatch(submitThunk(itemSelected.id));
      const { payload } = result;
      if (payload && payload.success) {
        
        toast.success('Operacion eliminada con exito!!')
        await dispatch(listThunk({}));
        dispatch(showModalDeleteItemReducer(false));
        
      } else {
        toast.warning("Algo salio mal");
      }
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      toast.error(error.message);
    }
  }

  return (
    <>
      <Modal
        show={showModalDelete}
        size="md"
        onClose={() => dispatch(showModalDeleteItemReducer(false))}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Esta seguro que desea eliminar este item ?
            </h3>
            <h4 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {itemSelected.nameItem}
            </h4>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={onDelete}
                disabled={isLoading || false}
              >
                {"Si, seguro"}
              </Button>
              <Button
                disabled={isLoading || false}
                color="gray"
                onClick={() => dispatch(showModalDeleteItemReducer(false))}
              >
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalDeleteItem;