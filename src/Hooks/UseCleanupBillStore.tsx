import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBills } from "../Store/features/bills";

const useCleanupBillStore = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addBills([]));
  }, []);
};

export default useCleanupBillStore;
