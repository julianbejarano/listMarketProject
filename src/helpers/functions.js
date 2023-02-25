export const generarId = () =>{
 const partA =  Math.random().toString(36).substr(2)
 const partB = Date.now().toString(36)

 return partA + partB
}

export const formatearFecha=(fecha)=>{
    const fechaNueva= new Date(fecha);
    const opciones= {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return fechaNueva.toLocaleDateString ('es-ES', opciones)
}