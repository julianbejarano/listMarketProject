import React from 'react'

// recordar que al recibir un children, acepta cualquier tipo de valor
const Mensaje = ({children, tipo}) => {
  return (
    // usamos stringTemplate para concatenar la clase, segín las propiedades que lleguen al componente.
    <div className={` bg-orange-400 text-black text-center p-4 rounded-md`}>{children}</div>
  )
}

export default Mensaje
