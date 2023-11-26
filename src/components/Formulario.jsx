import { useContext, useEffect, useState } from 'react'
import ProductoContext from '../contexts/ProductoContext'
import { useForm } from '../hooks/useForm'
import DragDrop from './DragDrop'
import './Formulario.scss'

const formInicial = {
    id: null,
    nombre: '',
    precio: '',
    stock: '',
    marca: '',
    categoria: '',
    detalles: '',
    foto: '',
    envio: false,
}

const Formulario = ( { productoAEditar, setProductoAEditar }) => {
  /* Creamos 2 estados para gestionar el drag and drop */
  const [foto, setFoto] = useState('')
  const [srcImagen, setSrcImagen] = useState('')

  const [form, setForm, handleChange] = useForm(formInicial)
  const { crearProductoContext, actualizarProductoContext } = useContext(ProductoContext)

  useEffect(() => {
    if ( productoAEditar ) {
      setForm(productoAEditar)
      setSrcImagen(productoAEditar.foto)
    } else {
      setForm(formInicial)
    }
    // productoAEditar ? setForm(productoAEditar) : setForm(formInicial)
  }, [productoAEditar, setProductoAEditar])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Se detuvo el comporamiento por defecto del formulario')

    try {

      if (form.id === null) {
        const productoNuevoConImagen = {...form, ...foto}
        await crearProductoContext(productoNuevoConImagen)
      } else {
        const productoNuevoConImagen = {...form, ...foto}
        await actualizarProductoContext(productoNuevoConImagen)
      }

      handleReset()
    } catch (error) {
      console.error('Algo ocurrió en el handleSubmit', error)
    }

  }

  const handleReset = () => {
    setForm(formInicial)
    setFoto('')
    setSrcImagen('')
  }  

  return (
    <>
      <h2>Agregar (Editar) producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="lbl-nombre">Nombre</label>
          <input
            type="text"
            name="nombre"
            id="lbl-nombre"
            placeholder='Ingrese un nombre'
            value={form.nombre}
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="lbl-precio">Precio</label>
          <input
            type="text"
            name="precio"
            id="lbl-precio"
            placeholder='Ingrese un precio'
            value={form.precio}
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="lbl-stock">Stock</label>
          <input
            type="text"
            name="stock"
            id="lbl-stock"
            placeholder='Ingrese un stock'
            value={form.stock}
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="lbl-marca">Marca</label>
          <input
            type="text"
            name="marca"
            id="lbl-marca"
            placeholder='Ingrese un marca'
            value={form.marca}
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="lbl-categoria">Categoría</label>
          <input
            type="text"
            name="categoria"
            id="lbl-categoria"
            placeholder='Ingrese un categoria'
            value={form.categoria}
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="lbl-detalles">Detalles</label>
          {<input
            type="text"
            name="detalles"
            id="lbl-detalles"
            placeholder='Ingrese un detalles'
            value={form.detalles}
            onChange={handleChange} />}
        </div>
       {/*  <div>
          <label htmlFor="lbl-foto">Foto</label>
          <input
            type="text"
            name="foto"
            id="lbl-foto"
            placeholder='Ingrese un foto'
            value={form.foto}
            onChange={handleChange} />
        </div> */}
        <DragDrop setFoto={setFoto} srcImagen={srcImagen} setSrcImagen={setSrcImagen} />

        <div>
          <label htmlFor="lbl-envio">Envío</label>
          <input
            type="checkbox"
            name="envio"
            id="lbl-envio"
            placeholder='Ingrese un envio'
            checked={form.envio}
            onChange={handleChange} />
        </div>
        <button type="submit">Enviar</button>
        <button type="reset" onClick={handleReset}>Limpiar</button>
      </form>
    </>

  )
}

export default Formulario