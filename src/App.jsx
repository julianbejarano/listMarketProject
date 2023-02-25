import { useState, useEffect } from 'react'
import Header from './components/header'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import ListadoPagos from './components/ListadoPagos'
import {generarId} from './helpers/functions'
import iconoGasto from './img/nuevo-gasto.svg' //podemos poner el nombre que queramos de la imagen ya ya estamos llamando al archivo directamante
import Filtros from './components/filtros'

function App() {

  // HOOKS.
  //caundo las variables pasan por diferentes componentes es necesario declarar el state en el archivo principal.
  //INicialmente revisamos si el valor del presupuesto esta en local storage, sino, entonces asignamos como valor 0
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  //INicialmente revisamos si el valor del presupuesto esta en local storage es mayor a 0, sino, entonces asignamos false, para que el usuario diligencie el valor
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto'))>0 ? (true) : (false)
  );
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  
  //INicialmente revisamos si en el LS existe el arreglo de gastos, si es asi lo convertimos de string al arreglo,
  // sino, asignamos un arreglo vacio
  const [gastos, setGastos]= useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);

  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro , setFiltro] = useState('');

  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  const [gastosPagados, setGastosPagados ] = useState(
    localStorage.getItem('gastosPagados') ? JSON.parse(localStorage.getItem('gastosPagados')) : []);

  const [viewPagados, setViewPagados] = useState(false)


    
  //FUNCTIONS
  /* esta funcion nos mostrará una ventana modal además, un segundo despues activa 
  la animación
  */
  const handleNuevoGasto = ()=>{
    setModal(true)
    setTimeout(() =>{setAnimarModal(true)},500)
    setGastoEditar({})
  }
  // GUARDADO Y EDICIÓN
  // esta funcion almacena los gastos en array, importante, crea una copie del arreglo y adiciona el ultimo valor, luego es asignada a gastos.
  const guardarGasto= (gasto) =>{
    // si el gasto tiene id significa que lo que estamos haciendo es editanto un registro previo
    if (gasto.id)
    { 
      const gastosActualizados= gastos.map((gastoTemp)=>{
        if (gastoTemp.id === gasto.id) {
          return gasto
        }
        else { return gastoTemp}}
        )
        setGastos(gastosActualizados);
        //si el filtro esta activo y queremos ver los cambios en los datos filtrados
        if (filtro !== ""){
          filtrarDatos(gastosActualizados);
        }
        setGastoEditar({});// volvemos el state a su valor inicial
        
    }
    else{
      gasto.id = generarId();
      gasto.fecha= Date.now();
      setGastos ([...gastos , gasto])
    }
    
  }
  // EDITAR GASTO
 // por medio de este effect verificamos si alguien hizo una selecion de algun elemento para editar
 // Luego de esto se guarda el contenido editado. Linea 30
  useEffect(()=>{
    if(Object.keys(gastoEditar).length >0){
      setModal(true)
    setTimeout(() =>{setAnimarModal(true)},500)
    }

  },[gastoEditar])

  //ELIMINAR GASTO y PAGO

  const eliminarGasto = ((id)=>{
      if (viewPagados === false)
        {
        const gastosActualizados= gastos.filter(gastoTemp=>{
        return gastoTemp.id !== id})
        setGastos(gastosActualizados);
        //si el filtro esta activo y queremos ver los cambios en los datos filtrados
        if (filtro !== ""){
          filtrarDatos(gastosActualizados);
        }
        }
      else 
        {
        const gastosActualizados= gastosPagados.filter(gastoTemp=>{
        return gastoTemp.id !== id})
        setGastosPagados(gastosActualizados);
        //si el filtro esta activo y queremos ver los cambios en los datos filtrados
        if (filtro !== ""){
          console.log ("llamando a función")
          filtrarDatos(gastosActualizados);
        }
      }

    })

//LOCAL STORAGE
//guarda en una variable presupuesto el valor del presupuesto.
useEffect(()=>{
  localStorage.setItem('presupuesto', presupuesto)
},[presupuesto]
)
// guarda en una variable el arreglo de gastos, si no hay valor, asigna un array vacio
useEffect(()=>{
localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
}
,[gastos]
)
// guarda en una variable el arreglo de gastosPagados, si no hay valor, asigna un array vacio

useEffect(()=>{
  localStorage.setItem('gastosPagados', JSON.stringify(gastosPagados) ?? [])
  }
  ,[gastosPagados]
  )

// FILTRAR DATOS

const filtrarDatos = ((gastos) =>{
  if (filtro !== ""){
    console.log("filtando: ", gastos)
    const gastosFiltrados = gastos.filter ((elemento)=>(elemento.categoria === filtro));
    setGastosFiltrados(gastosFiltrados);
  }
})


useEffect(()=>{
  if (viewPagados=== false)  
    {filtrarDatos(gastos);}
  else {
    filtrarDatos(gastosPagados);
  }
},[filtro])


// cambiar presupuesto Estimado

const handleCambioPresupuesto = () =>{
  const eleccion= confirm("deseas cambiar el presupuesto inicial")
  eleccion && (

                //llevar el monto del presupuesto actual y campiarlo por el presupuesto que defina el cliete
                //setPresupuesto(0),
                setIsValidPresupuesto(false)
                )
  }

// REsetear app
const handleResetApp = ()=>{
  const eleccion= confirm("Al confirmar borraras todos los datos")
  eleccion && (setGastos([]),
                setPresupuesto(0),
                setGastosPagados([]),
                setIsValidPresupuesto(false)
                )
  }

 


return (
  <div className= { viewPagados? (" bg-[#87A98A]") :(" bg-[#EBCBA9] md:bg-[#E6BE94]" ) }>
      <div className="font-extrabold mx-auto text-center text-4xl text-white">
      <Header 
        presupuesto = {presupuesto}
        setPresupuesto= {setPresupuesto}
        isValidPresupuesto= {isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos ={gastos}
        setGastos ={setGastos}
        gastosPagados={gastosPagados}
      />    
    </div>  
   { isValidPresupuesto && 
    (  < div className='flex justify-center mx-20 mt-5 md:mx-36 flex-col max-w-4xl'>
        
        <button 
          className=" bg-red-300 p-6 m-4 mx-4 rounded-xl font-extrabold"
          onClick={handleResetApp}>Resetear Valores
        </button>

        {/*Reset Presupuesto*/ }
        <button 
          className=" bg-amber-400 p-6 m-4 mx-4 rounded-xl font-extrabold"
          onClick={handleCambioPresupuesto}>Cambiar Presupuesto
        </button>

    
        {/*Cambiar la vista de gastos pendientes a pagados*/ }

        <button
            className= {` ${viewPagados ? (" bg-amber-100"):(" bg-teal-200")}  p-6 rounded-xl mx-4 m-4 font-extrabold `}
            onClick={()=>{
                setViewPagados (!viewPagados)
                console.log(viewPagados)
                setFiltro("")
                setGastosFiltrados([])

                }
                }
            >
            {viewPagados? (`Ver Pendientes (${gastos.length})`):(`Ver Canasta (${gastosPagados.length})`)}</button>

            <p className= {` ${viewPagados ? (" text-black"):(" text-white")}
                      text-center p-6  font-extrabold  uppercase text-2xl
                      mt-2 w-full`}>
                   {viewPagados? ("Estas en canasta"):("Estas en pendientes")} </p>
           
     </div>)
    }

    

      <div className='content-center'> 
        {
        //si el presupuesto es valido nos nuestra la imagen de nuevo gasto, 
        //el operador && funciona como ternario de una sola accion y entre parentesis quiere decir que es un return
        isValidPresupuesto && (
          <>
            <div className=' flex justify-center max-w-3xl mx-auto m-6 
                          text-slate-600 font-bold mb-2 p-4
                          text-lg text-center rounded-xl border-dotted border-light-blue-500
                          border-2'>
            <Filtros 
              filtro = {filtro}
              setFiltro = {setFiltro}
            />
            </div>
            
          {
            viewPagados ? (
              
              <div>
              <ListadoPagos
                gastosPagados ={gastosPagados}
                filtro= {filtro}
                gastosFiltrados = {gastosFiltrados}
                eliminarGasto = {eliminarGasto}
                gastos ={gastos}
                setGastos = {setGastos}
              />

              </div>
              )
            
            :(
              <div className=''>
              <ListadoGastos 
              gastos= {gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto = {eliminarGasto}
              filtro = {filtro}
              gastosFiltrados= {gastosFiltrados}
              gastosPagados = {gastosPagados}
              setGastosPagados = {setGastosPagados}
              />
              </div>
            )
          }
            <div className='fixed m-5 w-16 md:w-24 top-40 md:top-50 left-4 cursor-pointer hover:scale-105'>
            <img src={iconoGasto} 
            alt="iconoGasto" 
            onClick={handleNuevoGasto}/>
            </div>
          </>
          )
        }
      
      { // si modal es true  nos muestra la pantalla modal
      modal &&(
        <Modal 
          setModal ={setModal}
          animarModal= {animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar = {gastoEditar}
          setGastoEditar= {setGastoEditar}
          eliminarGasto = {eliminarGasto}
          />
          )
      }

    </div>
      <a href="https://www.julianbejarano.com/" target="_blank">
    <p className='m-2 p-3 text-white text-right opacity-60'>BY: JulianBejarano - 2022</p>
    </a>
  </div>
  )
}

export default App
