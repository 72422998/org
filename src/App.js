import { useState } from 'react';
import {v4 as uuid} from 'uuid';
import './App.css';
import Header from './componentes/Header/Header.js';
import Formulario from './componentes/Formulario/Formulario.js';
import MyOrg from './componentes/MiOrg';
import Equipo from './componentes/Equipo';
import Footer from './componentes/Footer';
function App() {

  const [mostrarFormulario,actualizarMostrar] = useState(false)
  const [colaboradores, actualizarColaboradores] = useState([
    { 
      id: uuid(),
      equipo: "Front End", 
      foto: "https://github.com/harlandlohora.png", 
      nombre: "Harland Lohora",
      puesto: "Instructor", 
      fav: true
    }, 
    { 
      id: uuid(),
      equipo:"Programación", 
      foto:"https://github.com/genesysaluralatam.png", 
      nombre: "Genesys Rondon", 
      puesto: "instructora" ,
      fav: false
    }, 
    { 
      id: uuid(), 
    equipo: "UX y Diseño", 
    foto: "https://github.com/JeanmarieAluraLatam.png", 
    nombre: "Jeanmarie Quijada", 
    puesto: "Instructora en Alura Latam",
    fav: true
    }, 
    { 
      id: uuid(),
    equipo: "Programación", 
    foto: "https://github.com/christianpva.png", 
    nombre: "Christian Velasco", 
    puesto: "Head de Alura e Instructor",
    fav: false
    },
    { 
      id: uuid(),
    equipo: "Innovación y Gestión", 
    foto: "https://github.com/JoseDarioGonzalezCha.png", 
    nombre: "Jose Gonzalez", 
    puesto: "Dev FullStack" ,
    fav: true
  }])
  const [equipos,actualizarEquipos]= useState([

    {
      titulo :"Programación",
      colorPrimario: "#57C278",
      coloSecundario: "#D9F7E9",
    },
    {
      titulo :"Front End",
      colorPrimario: "#82CFFA",
      coloSecundario: "#E8F8FF",
    },
    {
      titulo :"Data Science",
      colorPrimario: "#A6D157",
      coloSecundario: "#F0F8E2",
    },
    {
      titulo :"Devops",
      colorPrimario: "#E06B69",
      coloSecundario: "#FDE7E8",
    },
    {
      titulo :"UX y Diseño",
      colorPrimario: "#DB6EBF",
      coloSecundario: "#FAE9F5",
    },
    {
      titulo :"Móvil",
      colorPrimario: "#FFBA05",
      coloSecundario: "#FFF5D9",
    },
    {
      titulo :"Innovación y Gestión",
      colorPrimario: "#FF8A29",
      coloSecundario: "#FFEEDF",
    },

])

  //Ternario --> condicion ? seMuestra : noSemuestra
 // condicion && seMuestra 
  const cambiarMostrar = ()=>{
    actualizarMostrar(!mostrarFormulario)
  }
  //registrar colaborador
  const registrarColaborador = (colaborador)=>{
    console.log("Nuevo Colaborador", colaborador)
    //Spread operator
    actualizarColaboradores([...colaboradores, colaborador])
  }
  //eliminar colaborador
  const eliminarColaborador = (id) =>{
    console.log("Eliminar coalborador",id);
    const nuevosColaboradores = colaboradores.filter((colaborador)=>colaborador.id!==id)
    actualizarColaboradores(nuevosColaboradores)
  }

  //actualizar color de equipo
  const actualizarColor = (color,id)=>{
    console.log("Actualizar : ",color,id )
    const equiposActualizados = equipos.map((equipo)=>{
      if( equipo.id === id){
        equipo.colorPrimario = color
      }
      return equipo
    })
    actualizarEquipos(equiposActualizados)
  }

//Crear equipo
  const crearEquipo = (nuevoEquipo)=>{
    console.log(nuevoEquipo)
    actualizarEquipos([...equipos, {...nuevoEquipo,id:uuid()}])
   
  }

  const like =(id)=>{
    console.log("like",id)
    const colaboradoresActualizados = colaboradores.map((colaborador)=>{
      if( colaborador.id === id){
        colaborador.fav =!colaborador.fav
      }
      return colaborador
    })
      actualizarColaboradores(colaboradoresActualizados)
    
  }

  return (
    <div>
      <Header/>
      { /*mostrarFormulario? <Formulario/> : <></>*/}
      {mostrarFormulario && <Formulario 
      equipos={equipos.map((equipo)=>equipo.titulo)}
      registrarColaborador={registrarColaborador}
      crearEquipo={crearEquipo}
      
      />}

      <MyOrg cambiarMostrar={cambiarMostrar}/>
      {
        equipos.map( (equipo)=> <Equipo 
        datos={equipo} 
        key={equipo.titulo}
        colaboradores = {colaboradores.filter(colaborador=>colaborador.equipo ===equipo.titulo )}
        eliminarColaborador={eliminarColaborador}
        actualizarColor={actualizarColor}
        like={like}
        />)
      }
      <Footer/>
    </div>
  );
}

export default App;
