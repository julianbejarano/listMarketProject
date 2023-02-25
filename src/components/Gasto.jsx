import React from "react"

import { LeadingActions,
        SwipeableList,
        SwipeableListItem,
        SwipeAction,
        TrailingActions
        }
        from 'react-swipeable-list' 
import 'react-swipeable-list/dist/styles.css'
import {formatearFecha} from '../helpers/functions'
import IconoGustos from '../img/icono_gustos.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoClean from '../img/icono_clean.svg'
import IconoVerduras from '../img/icono_verduras.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoOtros from '../img/icono_otros.svg'

const Gasto = ({gasto, 
                setGastoEditar, 
                eliminarGasto, 
                gastosPagados,
                setGastosPagados
                }) => {

    const {nombre, categoria, cantidad, id, fecha} = gasto;
    // este diccionario de iconos será muy util para hacer el llamado a la imagen de la categoria
    const diccionarioIconos={
        
        comida: IconoComida,
        verduras: IconoVerduras,
        aseo: IconoClean,
        casa:   IconoCasa,
        gustos: IconoGustos,
        salud:  IconoSalud,
        otros: IconoOtros
    }
    // en este caso como se retorna un elemento se ponen los parentesis en vez de los corchetes
    const leadingActions = () =>
        (<LeadingActions>
            <SwipeAction onClick={()=>setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
        )
    
    const trailingActions = () =>
        (<TrailingActions >
            <SwipeAction 
             onClick={()=>{

                setGastosPagados([...gastosPagados , gasto])
                eliminarGasto(gasto.id)
                }
                }
             destructive = {true}
             >
            En canasta
            </SwipeAction>
        </TrailingActions>
        )
    


// lLeadingActions es cuando va de derecha a izquierda y trailingActions de izquierda a derecha
// al activarlos van a llamar a una funciones.
return (
    <div className="shadow-md mx-3 md:mx-10">
    <SwipeableList>
        <SwipeableListItem 
        leadingActions={leadingActions()}
        trailingActions= {trailingActions()}
        >

            <div className="p-4 bg-[#EDD2B4] m-4 rounded-lg justify-items-center">
                
                <div className="grid grid-cols-2 sm:grid-cols-3">
                    
                    <div className="">
                    <img src={diccionarioIconos[categoria]} 
                    className="w-3/5 mx-auto"
                    alt="IconoCategoria"
                    />
                    </div>

                    <div className="">
                        
                        <p className="font-bold	text-lg"> {nombre}</p>
                        <p className="textlg" 
                        > {categoria}</p>
                        <p className=" font-normal italic">
                            Agregado el: {" "}
                            <span>{formatearFecha(fecha)}</span>
                        </p>
                    </div>
                    <div className="grid place-items-center border-2 
                            rounded-md border-zinc-100	
                            border-dashed">
                    <p className="text-center font-bold text-xl ">${cantidad}</p>
                    </div>
                </div>
                
            </div>
    </SwipeableListItem>
    </SwipeableList>
    </div>
  )
}

export default Gasto
