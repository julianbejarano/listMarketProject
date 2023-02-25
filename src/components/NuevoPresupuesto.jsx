import { useState } from "react";
import Mensaje from "./Mensaje";


const NuevoPresupuesto = ({presupuesto, 
                        setPresupuesto,
                        setIsValidPresupuesto}) => {
    
    //HOOKS
    const [mensaje, setMensaje] = useState("");

    const [presupuestoTemp, setPresupuestoTemp]= useState();
    
    //FUNCTIONS
    const handlePresupuesto = (e) =>{
        e.preventDefault();
        if(!presupuestoTemp || presupuestoTemp < 0 ){ //si no hay numero o si es menor a 0
            setMensaje("No es un presupuesto válido")
            return
        }
        
        setMensaje("");
        setIsValidPresupuesto(true);
        setPresupuesto(presupuestoTemp)
    
    }
  


    return (
    <div className=" flex flex-col mx-auto relative bg-slate-700 text-xl m-8 p-6 rounded-lg max-w-xl">
        <form 
            onSubmit={handlePresupuesto}
           >
            <div className="grid  object-center text-center p-6 mx-auto">
                <div className="p-4 font-extrabold text-white">
                <label htmlFor="campoPresupuesto">
                    
                    {
                    ` ${presupuesto>0 ? (`Tu presupuesto actual: ${presupuesto}` ):(" Primero, Define un presupuesto inicial") } `
                        
                       //("Primero, define un presupuesto total")
                    }
                    
                    </label>
                </div>
                <div>
                <input type="text"
                    id="campoPresupuesto"
                    className="rounded-lg w-full h-14 text-bold text-center text-black"
                    placeholder="Añade tu presupuesto"
                    onChange={ (e) => {setPresupuestoTemp(Number(e.target.value))}}

                /></div>

                <input type="submit" 
                    value="Añadir"
                    className=" bg-teal-500 p-4 rounded-md mt-4 shadow-md cursor-pointer"
                    
                />

             {mensaje &&  <Mensaje tipo="error">{mensaje}</Mensaje>}
            </div>
        </form>
    </div>
  )
}

export default NuevoPresupuesto
