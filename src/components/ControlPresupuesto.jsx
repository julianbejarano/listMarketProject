import { useEffect, useState } from "react"
import {CircularProgressbar,
        CircularProgressbarWithChildren, 
        buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css" 

const ControlPresupuesto = ({gastos, 
                            presupuesto, 
                            setGastos, 
                            setPresupuesto,
                            setIsValidPresupuesto,
                            gastosPagados
                          }) => {
  //functions

const [disponible, setDisponible] = useState (0)
const [gastado, setGastado] = useState (0)
const [porcentajeGastado, setPorcentajeGastado] = useState(0)
const [gastoProyectado, setGastoProyectado]= useState (0)

// al detectar cambios en el arreglo de PAGOS va sumando las cantidades de cada uno de los gastos
useEffect (() => {
  const totalGastado = gastosPagados.reduce((total , gasto) => gasto.cantidad + total, 0);
  setGastado(totalGastado);
  setDisponible (presupuesto - totalGastado);
  
  },[gastosPagados])

// al detectar cambios en el arreglo de GASTOSPROYECTADOS va sumando las cantidades de cada uno de los gastos
useEffect (() => {
  const totalProyectado = gastos.reduce((total , gasto) => gasto.cantidad + total, 0);
  setGastoProyectado(totalProyectado);
  
  },[gastos])


  useEffect(()=>{
    // actualizamos el porcentaje de gasto y mostramos 2 decimas
  const porcentajeGasto = ( ((presupuesto - disponible)/ presupuesto) *100).toFixed(2);
  setTimeout(()=>
    { setPorcentajeGastado(porcentajeGasto);},700);
  }
  , [disponible])


  // esta función nos mostrará el valor formateado en dinero, con puntos y centavos
  const formatearCantidad = (cantidad) =>{
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
  }
  
    return (
    <div className="grid grid-cols-2 m-6 gap-1  md:gap-2 md:mx-40 place-items-center" >

          <div className=" mx-auto">
           <CircularProgressbar
          value={porcentajeGastado}
          text= {`% gastado: ${porcentajeGastado}`}
          styles={
            buildStyles({
              textSize: '9px',
            strokeLinecap: "butt",
            pathTransitionDuration: 1.25,
            pathColor : porcentajeGastado > 95 ? ("#7f1d1b"): ("#3B82F6"),
            textColor: porcentajeGastado > 95 ? ("#3f0c0c"): ("#666e79"),
            trailColor: "#eee",
            })}>
         </CircularProgressbar>
          </div>

      <div className="flex flex-col justify-items-between">
        
        <div className="bg-[#D9E7F6] p-4 m-2 rounded-lg text-lg font-bold  md:w-full">
          <div className="text-left text-black text-xl">
              <span>Presupuesto:</span><br /><p className=" text-right"> {formatearCantidad(presupuesto)}</p>
          </div>
          <div className={`text-left ${gastoProyectado > presupuesto ? (" text-red-900"):("text-black")}`}>
              <span>$ Pendientes:</span><br />
              <p className=" text-right"> {formatearCantidad(gastoProyectado)}</p>
          </div>
          <div className={`text-left ${porcentajeGastado > 95 ? (" text-red-900"):("text-black")}`}>
              <span>$ Canasta:</span><br /><p className=" text-right"> {formatearCantidad(gastado)}</p>
          </div>
          <div className={`text-left ${porcentajeGastado > 95 ? (" text-red-900"):(" text-zinc-600")}`}>
              <span>Disponible:</span><br /> <p className=" text-right"> {formatearCantidad(disponible)}</p>
          </div>
          </div>
      </div>
    </div>
  )
}

export default ControlPresupuesto
