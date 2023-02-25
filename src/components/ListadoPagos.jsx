import  GastoPagado from './GastoPagado'


const ListadoPagos = ({
        gastosPagados,
        filtro, 
        gastosFiltrados,
        eliminarGasto,
        gastos,
        setGastos
        }) => {
  return (
    <div>
      {
      filtro !== ""?
        (<div className='grid place-items-center mx-auto '>
            <h2
            className=' text-lg font-semibold p-4 text-center m-2'
            >{gastosFiltrados.length ?("Productos Filtrados"):("No hay productos en esta categoria")}</h2>
            <div className="object-none object-center">
            {gastosFiltrados.map (gasto=>{
                return (
                <GastoPagado
                key={gasto.id}
                gasto = {gasto}
                eliminarGasto = {eliminarGasto}
                gastos ={gastos}
                setGastos = {setGastos}
                />)})
            }</div>
            </div>
        ):
        (
            <div className='grid place-items-center mx-auto '>
            <h2
            className=' text-lg font-semibold p-4 text-center m-2'
            >{gastosPagados.length ? ("Productos en canasta"):("NO HAY NADA EN CANASTA")}</h2>
            <div className="object-none object-center">
            {gastosPagados.map (gasto=>{
                return (
                <GastoPagado
                key={gasto.id}
                gasto = {gasto}
                gastosPagados = {gastosPagados}
                eliminarGasto = {eliminarGasto}
                gastos ={gastos}
                setGastos = {setGastos}
                />)})
            }</div>
            </div>
        )
        }  
    </div>
  )
}

export default ListadoPagos
