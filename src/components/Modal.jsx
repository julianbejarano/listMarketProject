import {useState, useEffect} from 'react'
import cerrar from'../img/cerrar.svg'
import Mensaje from './Mensaje'


const Modal = ({setModal, 
                animarModal,
                setAnimarModal,
                guardarGasto,
                gastoEditar,
                setGastoEditar,
                eliminarGasto
            }) => {

    //STATES
    const [nombre,setNombre] = useState('')
    const [cantidad,setCantidad]=useState();    
    const [categoria,setCategoria] =useState ('');
    const [mensaje, setMensaje] = useState ('');
    const [id , setId] = useState ('');
    const [fecha, setFecha] = useState('');
    
    //FUNCTIONS

    const ocultarModal= () => {
        //al dar clic en el boton de cerrar, todo el componente se cierra, por esto el set modal pasa a false
        // primero hacemos que el formulario desaparexca y luego la pantalla modal.
        
        setAnimarModal(false)
        setTimeout(()=>{
            setModal(false)
        },100);
        setGastoEditar({})
    }

    const handleSubmit= (e) =>{
        e.preventDefault();
        if ([nombre, cantidad, categoria].includes('')){
            setMensaje("Todos los datos son necesarios");
            setTimeout(()=>{
                setMensaje("");
            },2500)
            return;
        }
        if(!cantidad || cantidad < 0 ){ //si no hay numero o si es menor a 0
            setMensaje("El valor ingresado no es valido");
            setTimeout(()=>{
                setMensaje("");
            },2500)
            return
        }
        //si pasa todas las validadiones regresamos los datos al componente principal (app.jsx)
        guardarGasto({nombre, cantidad, categoria, id, fecha});
        ocultarModal();
        //
    }
// Esta funcion comprueba si se ha seleccionado un objeto para edicion y si ese 
// objeto esta con datos
    useEffect(()=>{
        if(Object.keys(gastoEditar).length >0){
        setNombre(gastoEditar.nombre);
        setCantidad(gastoEditar.cantidad);
        setCategoria(gastoEditar.categoria);
        setId(gastoEditar.id)
        setFecha(gastoEditar.fecha)
        }
    },[gastoEditar])


  return (
    <div className='fixed bg-slate-700 bg-opacity-90 top-0 bottom-0 left-0 right-0 flex flex-col '>
      <div className=' fixed h-10 w-10 top-10 right-5 md:right-10 cursor-pointer hover:scale-75 '>
        <img src={cerrar} alt="cerrar"
        onClick={ocultarModal} />
      </div>

      <div className='mt-20 md:mt-10 shadow-lg'>
        {/**cuando se activa el setAnimarModal en el index.jsx, cambiamos la clase del formulario 
         * de "formulario cerrar" a "formulario animar" , estas animacione estánd definidas en el index.css*/}
        <form onSubmit={handleSubmit}
             className={`grid w-60 max-w-4xl mx-auto mt-2 
                         text-slate-50 font-bold mb-2  
                         text-xl${animarModal? (""):("")}`}>
            <legend className='text-center font-extrabold text-4xl'>{gastoEditar.nombre ? ("Editar Gasto"): ("Nuevo Gasto")}</legend>

            {
                //si mensaje tiene valor entonces le pasamos el mensaje definido. Linea 29
                mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>
            }
            <div className=' p-1 mt-1 text-left '>
                <label htmlFor="NomGasto">Nombre del Gasto</label>
                <input type="text" 
                        className='  text-slate-500 text-lg rounded-lg h-10 w-64 p-2 mt-1 bg-gray-200'
                        placeholder='Que vas comprar?'
                        id='NomGasto'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}/>
            </div>

            <div className='p-1 mt-1 text-left'>
                <label htmlFor="Cantidad">Cantidad del Gasto</label>
                <input type="number" 
                        className=' text-slate-500 rounded-lg h-10 w-64 p-2 mt-1 bg-gray-200'
                        placeholder='Costo estimado'
                        id='Cantidad'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}/>
            </div>

            <div className='p-1 mt-1 text-left'>
                <div className=''>
                    <label htmlFor="Categoria">Categoria</label></div>
                <select name="" 
                    id="Categoria"
                    className=' text-slate-500 rounded-lg h-10 w-64 p-2 mt-1 bg-gray-200'
                    value={categoria}
                        onChange={e => setCategoria(e.target.value)}    
                >
                    <option value=""> -- Seleccione -- </option> 
                    <option value="comida">Comida</option>
                    <option value="verduras">Verduras</option>
                    <option value="aseo">Aseo</option>
                    <option value="casa">Casa</option>
                    <option value="gustos">Gustos</option>
                    <option value="salud">Salud</option>
                    <option value="otros">Otros</option>
                </select>
            </div>

            <input type="submit"
                    className=' bg-emerald-600 p-6 w-auto rounded-lg m-2 mt-5 h-16'
            value={gastoEditar.nombre ? ("Guardar Cambios"): ("Añadir Gasto")} />
            
            {   //si editamos el valor, mostramos un boton para eliminar el objeto
                gastoEditar.nombre && (
                    <button
                    className=' bg-red-500 p-6 w-auto rounded-lg h-16 m-2'
                    onClick={()=>{
                        const res = confirm("desea elmininar")
                        res && (eliminarGasto(gastoEditar.id))
                        }
                        }
                    >
                    Eliminar Gasto</button>
                )
            }
            
            
        </form>
      </div>
    </div>
  )
}

export default Modal
