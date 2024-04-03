import { initFlowbite } from "flowbite";
import React, { useCallback, useEffect, useState } from "react";
import ModalCreateOperation from "../components/operations/ModalCreateOperation";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesSelector } from "../features/categories/selectors";
import { getCategoriesThunk } from "../features/categories/categoriesSlice";
import {
  deleteOperationThunk,
  getOperationsThunk,
} from "../features/operations/operationsSlice";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  getOperationSelected,
  getOperationsSelector,
} from "../features/operations/selectors";
import DropdownOperations from "../components/operations/DropdownOperations";
import { getAccountsSelector } from "../features/accountsMoney/selectors";
import { getAccounstMoneyThunk } from "../features/accountsMoney/accountMoneySlice";
import ModalUpdateOperation from "../components/operations/ModalUpdateOperation";
import ModalDeleteItem from "../components/ModalDeleteItem";
import { formatDate, formatFullDateTime } from "../utils/functionsTools";
import DateRange from "../components/DateRange";
import { getDateRangeSelector } from "../features/ui/selectors";
import { searchOperationsByDate } from "../components/operations/controller";
import { read, utils, writeFile } from "xlsx";
import { setDateRangeReducer } from "../features/ui/uiSlice";
const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("type_operation", {
    header: () => "Tipo",
    cell: (info) => {
      const badge =
        info.getValue() === "IN" ? (
          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
            Entrada
          </span>
        ) : (
          <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
            Salida
          </span>
        );

      return badge;
    },
  }),

  columnHelper.accessor((row) => row, {
    id: "account",
    header: () => "Cuenta",
    cell: (info) => {
      const account = info.getValue().account;

      return account.name;
    },
  }),
  columnHelper.accessor((row) => row, {
    id: "category_operation",
    header: () => "Categoria",
    cell: (info) => {
      const category = info.getValue().category;

      return category.name;
    },
  }),

  columnHelper.accessor((row) => row, {
    header: () => "Fecha Operacion",
    id: "date_operation",
    cell: (info) => {
      const date_operation = formatFullDateTime(info.getValue().date_operation);
      return date_operation;
    },
  }),

  columnHelper.accessor("state_operation", {
    header: "Estado",
    cell: (info) => {
      const stateOperation = info.getValue();
      let badge;
      switch (stateOperation) {
        case "DONE":
          badge = (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              Hecho
            </span>
          );
          break;

        case "PENDING":
          badge = (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
              Pendiente
            </span>
          );
          break;

        case "DELETED":
          badge = (
            <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
              Error
            </span>
          );
          break;

        default:
          badge = (
            <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
              Error
            </span>
          );
          break;
      }

      return badge;
    },
  }),
  columnHelper.accessor("description", {
    header: () => "Description",
  }),

  columnHelper.accessor("quantity", {
    header: () => "Monto",
  }),

  columnHelper.accessor((row) => row, {
    id: "options",
    header: () => " Opciones",
    cell: (info) => {
      return (
        <DropdownOperations operation={info.getValue()}></DropdownOperations>
      );
    },
  }),
];

function Operations() {
  const dispatch = useDispatch();
  const operationsList = useSelector(getOperationsSelector);
  const operationSelected = useSelector(getOperationSelected);
  const dateRange = useSelector(getDateRangeSelector);

  const exportFile = useCallback(() => {
    /* generate worksheet from state */
    const ws = utils.json_to_sheet(operationsList);
    /* create workbook and append worksheet */
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    /* export to XLSX */
    writeFile(wb, "SheetJSReactAoO.xlsx");
  }, [operationsList]);
  const table = useReactTable({
    data: operationsList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  useEffect(() => {
    initFlowbite();
    (async () => {
      dispatch(setDateRangeReducer([null, null]))
      await dispatch(getCategoriesThunk({}));
      await dispatch(getAccounstMoneyThunk({}));
      await dispatch(getOperationsThunk({}));
    })();
  }, []);

  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <div>
      <div className="block  p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Operaciones
        </h5>
        <div className="mb-6 flex gap-5 items-end">
          <div className="">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Filtro fecha
            </label>
            <DateRange></DateRange>
          </div>
          <button
            type="button"
            onClick={() => {
              searchOperationsByDate(dateRange, dispatch);
            }}
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 max-h-14 "
          >
            Buscar
          </button>
        </div>
         <div className="flex gap-5 justify-between" >
         <ModalCreateOperation></ModalCreateOperation>
        <ModalUpdateOperation></ModalUpdateOperation>
        <ModalDeleteItem
          itemSelected={operationSelected}
          submitThunk={deleteOperationThunk}
          listThunk={getOperationsThunk}
        ></ModalDeleteItem>
          <button onClick={exportFile} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Exportar</button>
          </div>   
        
        <div className="relative overflow-x-auto mt-8">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} scope="col" className="px-6 py-3">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center py-8">
                    <span className="text-gray-500">No hay resultados...</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Operations;
