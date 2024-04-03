import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { HiChartBar } from "react-icons/hi2";
import { HiMiniArchiveBoxArrowDown } from "react-icons/hi2";
import { HiCircleStack } from "react-icons/hi2";
import { getOperationsReport } from "../components/operations/services";
import { combineAndSortDates, getCurrentYear } from "../utils/functionsTools";
import { getMyCurrencyThunk } from "../features/currencies/currencySlice";
import { useDispatch, useSelector } from "react-redux";
import { myCurrencySelector } from "../features/currencies/selectors";

ChartJS.register(
  CategoryScale,
  PointElement,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options_chart_vertical = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Operaciones mensuales",
    },
  },
};

const options_chart_horizontal = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Operaciones diarias",
    },
  },
};

const labels = [
  "Jan",
  "Febr",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Set",
  "Oct",
  "Nov",
  "Decem",
];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const data2 = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function Dashboard() {
  const dispatch=useDispatch()
  const myCurrency = useSelector(myCurrencySelector);
  const [dataChartVertical, setChartVertical] = useState(data);
  const [dataChartHorizontal, setChartHorizontal] = useState(data);
  const [totalsState, setTotals] = useState({});
  useEffect(() => {
    (async () => {
      const myCurrencyData = await dispatch(getMyCurrencyThunk());
      const responseTotals = await getOperationsReport({
        report_name: "totals",
        start: "",
        end: "",
      });

      const { data: totals } = responseTotals;

      setTotals(totals);

      const response = await getOperationsReport({
        report_name: "operations_by_month",
        year: getCurrentYear(),
      });
      const { data } = response;
      const dataIn = dataChartVertical.labels.map((itemx, idx) => {
        const { result_in } = data;
        const monthFound = result_in.find((item) => item.month == idx + 1);
        if (monthFound) {
          return monthFound.total;
        } else {
          return 0;
        }
      });

      const dataOut = dataChartVertical.labels.map((itemx, idx) => {
        const { result_out } = data;
        const monthFound = result_out.find((item) => item.month == idx + 1);
        if (monthFound) {
          return monthFound.total;
        } else {
          return 0;
        }
      });

      const datatSetIn = {
        label: "Entradas",
        data: dataIn,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      };

      const dataSetOut = {
        label: "Salidas",
        data: dataOut,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      };

      setChartVertical({
        ...dataChartVertical,
        datasets: [datatSetIn, dataSetOut],
      });

      const resHorizontalChart = await getOperationsReport({
        report_name: "operations_daily",
        start: "",
        end: "",
      });

      const { data: dataHorizontal } = resHorizontalChart;

      const { result_in_daily, result_out_daily } = dataHorizontal;
      const arrayInDaily = result_in_daily.map((item) => {
        return item.formatted_date;
      });

      const arraySetOutDaily = result_out_daily.map((item) => {
        return item.formatted_date;
      });
      const labels = combineAndSortDates(arrayInDaily, arraySetOutDaily);

      const setDataInDaily = labels.map((item) => {
        const operationFound = result_in_daily.find(
          (operation) => operation.formatted_date == item
        );
        if (operationFound) {
          return operationFound.total;
        } else {
          return 0;
        }
      });

      const setDataOutDaily = labels.map((item) => {
        const operationFound = result_out_daily.find(
          (operation) => operation.formatted_date == item
        );
        if (operationFound) {
          return operationFound.total;
        } else {
          return 0;
        }
      });

      const dataInDaily = {
        label: "Entradas",
        data: setDataInDaily,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      };

      const dataOutDaily = {
        label: "Salidas",
        data: setDataOutDaily,

        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      };

      setChartHorizontal({
        labels: labels,
        datasets: [dataOutDaily, dataInDaily],
      });
    })();
  }, []);

  return (
    <div>
      <div className="block  p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Dashboard
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400"></p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
          <a
            href="#"
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="p-3">
              <HiChartBar className="text-5xl text-slate-700" />
            </div>

            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Total Ingresos
              </h5>
              <h1 className="text-5xl font-extrabold dark:text-white">
                <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
                  {myCurrency.currency_code || 'PEN'} {totalsState.total_in || 0}
                </small>
              </h1>
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="p-3">
              <HiMiniArchiveBoxArrowDown className="text-5xl text-slate-700" />
            </div>

            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Total Egresos
              </h5>
              <h1 className="text-5xl font-extrabold dark:text-white">
                <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
                  {myCurrency.currency_code || 'PEN'} {totalsState.total_out || 0}
                </small>
              </h1>
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="p-3">
              <HiCircleStack className="text-5xl text-slate-700" />
            </div>

            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Total en cuentas
              </h5>
              <h1 className="text-5xl font-extrabold dark:text-white">
                <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
                  {myCurrency.currency_code || 'PEN'} {Number(totalsState.total_money) || 0}{" "}
                </small>
              </h1>
            </div>
          </a>
        </div>

        <div className="flex flex-col  gap-4 w-full md:flex-row mt-6">
          <div className="flex-1 h-48 max-h-56">
            <Bar options={options_chart_vertical} data={dataChartVertical} />
          </div>
          <div className="flex-1 h-48 max-h-56">
            <Line
              options={options_chart_horizontal}
              data={dataChartHorizontal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
