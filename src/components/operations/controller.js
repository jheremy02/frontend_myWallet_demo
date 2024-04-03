import { getOperationsThunk } from "../../features/operations/operationsSlice";
import { formatDate } from "../../utils/functionsTools";

export async function searchOperationsByDate(dateRange,dispatch) {
    
    const start=dateRange[0]?formatDate(dateRange[0]):null
    const end=dateRange[1]?formatDate(dateRange[1]):null

    await dispatch(getOperationsThunk({start,end}));

  }