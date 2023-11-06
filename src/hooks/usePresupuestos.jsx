import { useContext } from "react";
import CotizadorContext from "../context/CotizadorContext";



const usePresupuestos = () => useContext(CotizadorContext);
export default usePresupuestos;