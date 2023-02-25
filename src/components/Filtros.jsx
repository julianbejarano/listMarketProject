import {useState, useEffect} from 'react'

const Filtros = ({filtro, setFiltro}) => {

  return (
    <div className='content-center justify-between'>
        <form >
            <div className='auto-rows-auto'>
                <div><label htmlFor="filtro">Filtrar Gastos </label></div>
                <select id="filtro" value={filtro}
                        onChange={e => setFiltro(e.target.value)}    
                >
                     <option value=""> -- Todas las categorias -- </option> 
                    <option value="comida">Comida</option>
                    <option value="verduras">Verduras</option>
                    <option value="aseo">Aseo</option>
                    <option value="casa">Casa</option>
                    <option value="gustos">Gustos</option>
                    <option value="salud">Salud</option>
                    <option value="otros">Otros</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filtros
