import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { initFlowbite } from "flowbite";
import { Dropdown } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaListUl } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  categorySelectedSelector,
  getCategoriesSelector,
} from "../features/categories/selectors";
import {
  deleteCategoryThunk,
  getCategoriesThunk,
} from "../features/categories/categoriesSlice";
import { info } from "autoprefixer";
import ModalCreateCategory from "../components/categories/ModalCreateCategory";
import DropdownCategories from "../components/categories/DropdownCategories";
import ModalUpdateCategory from "../components/categories/ModalUpdateCategory";
import ModalDeleteCategory from "../components/categories/ModalDeleteCategory";
import ModalDeleteItem from "../components/ModalDeleteItem";

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("name", {
    header: () => "Nombre",
  }),

  /*
    columnHelper.accessor("type_operation", {
    header: () => "Tipo",
    cell: (info) => {
      const type = info.getValue();
      if (type === "IN") {
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
            Entrada
          </span>
        );
      } else {
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
            Salida
          </span>
        );
      }
    },
  }),
  */

  columnHelper.accessor("created_at", {
    header: () => "Creado",
  }),

  columnHelper.accessor((row) => row, {
    id: "options",
    cell: (info) => {
      return (
        <DropdownCategories category={info.getValue()}></DropdownCategories>
      );
    },
    header: () => "",
  }),
];

function Categories() {
  const [showModalDelete, setModalDelete] = useState(false);
  const categories = useSelector(getCategoriesSelector);
  const categorySelected = useSelector(categorySelectedSelector);
  const { id, name } = categorySelected;
  const data = categories;
  const dispatch = useDispatch();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  useEffect(() => {
    initFlowbite();
    (async () => {
      await dispatch(getCategoriesThunk({}));
    })();
  }, []);
  return (
    <div>
      <div className="block  p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Categorias
        </h5>
        <ModalCreateCategory></ModalCreateCategory>
        <ModalUpdateCategory></ModalUpdateCategory>
        <ModalDeleteItem
          itemSelected={{ id, nameItem: name }}
          submitThunk={deleteCategoryThunk}
          listThunk={getCategoriesThunk}
        ></ModalDeleteItem>

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
              {table.getRowModel().rows.length > 0 ?table.getRowModel().rows.map((row) => (
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
              )):(
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

export default Categories;
