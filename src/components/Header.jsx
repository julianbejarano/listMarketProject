import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"

const Header = ({presupuesto, 
                setPresupuesto,
                isValidPresupuesto,
                setIsValidPresupuesto,
                gastos,
                setGastos,
                gastosPagados
              }) => {
  return (
    <header >
        <div className="">
        <h1>
            Asistente de Mercado
        </h1>


        { 
        // si el presupuesto es valido nos puestra en pantalla el componente de contros presupuesto, si no, nos mantiene en el componente nuevo pesupuesto
        isValidPresupuesto ? (
         <ControlPresupuesto 
         gastos = {gastos}
         presupuesto={presupuesto}
         setGastos={setGastos}
         setPresupuesto ={setPresupuesto}
         setIsValidPresupuesto={setIsValidPresupuesto}
         gastosPagados={gastosPagados}
         /> 
        )
        : 
            (
            <NuevoPresupuesto 
            presupuesto = {presupuesto}
            setPresupuesto= {setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
            />
            )
        }
        </div>
        
    </header>
  )
}

export default Header
