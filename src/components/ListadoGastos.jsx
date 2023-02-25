import Gasto from './Gasto'

const ListadoGastos = ({gastos,
                        setGastoEditar, 
                        eliminarGasto, 
                        filtro, 
                        gastosFiltrados,
                        gastosPagados,
                        setGastosPagados
                      }) => {


  return (
    <div className="grid flex-auto">
      {
        /**si existe un filtro de busqueda, primero revisamos si existen items
         * en la categria filtrada, dependiendo de este valor mostraremos un mensaje y los items 
         * encontrados. En caso en que no exsita filtro se mostrarán todos los datos de gastos
         */
        filtro !== ""? 
          (<>
           <h2
           className='text-lg font-semibold p-4 text-center m-2'
           >{gastosFiltrados.length ? ("Productos Filtrados"):("No hay productos en esta categoria")}</h2>
            {gastosFiltrados.map (gasto=>{
              return (
              <Gasto
              key={gasto.id}
              gasto = {gasto}
              setGastoEditar = {setGastoEditar}
              eliminarGasto = {eliminarGasto}
              />)})
            }
            </>
          )
          :
          (<div className='grid place-items-center mx-auto '>
             <h2
              className=' text-lg font-semibold p-4 text-center m-2 mt-8 mb-8'
             >{gastos.length ? ("Gastos proyectados"):("NO HAY PENDIENTES")}</h2>
              <div className="object-none object-center">
              {gastos.map (gasto=>{
                  return (
                  <Gasto
                  key={gasto.id}
                  gasto = {gasto}
                  setGastoEditar = {setGastoEditar}
                  eliminarGasto = {eliminarGasto}
                  gastosPagados = {gastosPagados}
                  setGastosPagados = {setGastosPagados}
        
                  />)})
              }</div>
            </div>
          )
      }

    </div>
  )
}

export default ListadoGastos
