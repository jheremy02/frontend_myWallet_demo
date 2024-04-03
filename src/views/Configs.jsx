import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currencySelected,
  getCurrenciesThunk,
  getMyCurrencyThunk,
} from "../features/currencies/currencySlice";
import {
  currenciesListSelector,
  myCurrencySelector,
} from "../features/currencies/selectors";
import { updateMyCurrency } from "../components/configs/services";
import { toast } from "react-toastify";

function Configs() {
  const currenciesList = useSelector(currenciesListSelector);
  const myCurrency = useSelector(myCurrencySelector);
  const dispatch = useDispatch();

  async function onChangeUpdateCurrency(e) {
    try {
      console.log(e.target.value);
      const id_currency = Number(e.target.value);
      const response = await updateMyCurrency({ id_currency });
      const currencyFound=currenciesList.find(item=>item.id_currency===id_currency)
      dispatch(currencySelected(currencyFound))
      toast.success('Moneda actualizada con exito!!')
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    (async () => {
      const result = await dispatch(getCurrenciesThunk());
      const myCurrencyData = await dispatch(getMyCurrencyThunk());
    })();
  }, []);

  return (
    <div>
      <div className="block  p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Configuraciones
        </h5>

        <div className=" mt-8">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Moneda
            </label>
            <select
              onChange={onChangeUpdateCurrency}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected="">Seleccione Moneda</option>
              {currenciesList.map((item) => {
                if (item.id_currency === myCurrency.id_currency) {
                  return (
                    <option
                      key={crypto.randomUUID()}
                      value={myCurrency.id_currency}
                      selected
                    >
                      {myCurrency.currency_name}
                    </option>
                  );
                } else {
                  return (
                    <option key={crypto.randomUUID()} value={item.id_currency}>
                      {item.currency_name}
                    </option>
                  );
                }
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Configs;
