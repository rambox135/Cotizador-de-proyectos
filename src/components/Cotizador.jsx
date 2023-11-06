import { Link } from "react-router-dom";

import { FaClipboardList } from "react-icons/fa6"
import Opciones from "./Opciones";
import { useEffect, useState } from "react";
import useCotizador from "../hooks/useCotizador";
import usePresupuestos from "../hooks/usePresupuestos";

import Swal from "sweetalert2";
const Cotizador = () => {
 const [precio,setPrecio] = useState(0);
 const [datos, setDatos] = useState([]);
 const {elementos, setElementos} = useCotizador();
 const {presupuestos, setPresupuestos} = usePresupuestos();
 const realizarCotizacion = () => {
    const {dias,proyecto,cliente} = elementos
    if(dias < 30 || proyecto == 0 || cliente == 0) {
      Swal.fire("Error","Debes completar los datos","error");
    }
    const cuenta = 5000 * dias * proyecto * cliente;
    setPrecio(cuenta);
};
const guardar = () => {
  setPresupuestos([
    ...presupuestos,
    {
    fecha:new Date().toDateString(),
    ...elementos,
    cuenta: 5000 * elementos.dias * elementos.proyecto * elementos.cliente
  },
]);
 setPrecio(0);
};
useEffect(() => {
     const leer = async () => setDatos(await (await fetch("/data.json")).json()) ;
     leer();
}, []);
    return (
       <>
            <nav>
                <Link to={"/presupuestos"}>
                    <FaClipboardList />
                </Link>
           </nav>

           <form action="" onSubmit={(e) => e.preventDefault()}>
            <Opciones 
            datos={datos.filter(({ categoria }) => categoria == "proyecto" )}
            label={"Tipo de Proyecto"}  
            tipo= {"proyecto"} 
            />

            <Opciones 
            datos={datos.filter(({ categoria }) => categoria == "cliente" )} 
            label={"Tipo de Clientes"}  
            tipo= {"cliente"} 
            />
            <label htmlFor="dias">Cantidad de dias</label>
            <input 
            type="number" 
            id="dias"
            min={30}
            defaultValue={30} 
            onInput={(e) => 
                setElementos({ 
                    ...elementos, 
                    dias: isNaN(parseInt(e.target.value))
                     ? 30 
                     : parseInt(e.target.value) < 30
                      ? 30
                      : parseInt(e.target.value), 
                    })
                } 
            />
            <button tipe="button" onClick={realizarCotizacion}>
                Cotizar
            </button>
           </form>

        {precio != 0 && (
        <>
        <p>El Precio estimado es de ${precio.toFixed(2)}</p>
        <form onSubmit={(e) => e.preventDefault()}>
            <button type="button" onClick={guardar}>
                Guardar
            </button>
        </form>
        </>
        )}
           
        
    </>
    );
};
export default Cotizador;