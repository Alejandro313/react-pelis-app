/* eslint-disable jsx-a11y/iframe-has-title */
import logo from "./logo.svg";
import "./App.css";
import Pelicula from "./Pelicula";
import PageWrapper from "./PageWrapper";
import Paginacion from "./Paginacion";
import { useEffect, useState } from "react";

function App() {
  const [paginaActual, setPaginaActual] = useState(1); //variable y funcion, donde variable va ser 1 y setPaginaActual es la funcion de la modificación del estado
  const total_por_pagina = 7;
  const [peliculas, setPeliculas] = useState([]);

  //funcionaría solo si se ejecuta la el elemento llamado dentro del corchete final
  //y si entre los corchetes del final no hay nada, entonce se ejecuta solo cuando se inicie la pagina
  useEffect(() => {
     buscarPeliculas();
  }, []);

  //https://cors-anywhere.herokuapp.com/
  const buscarPeliculas = async () => {
    let url = 'https://lucasmoy.dev/data/react/peliculas.json';

    //Fetch es una funcion sincronica (accion en tiempo real)
    //Si encerramos fetch en una variable para luego mostrarla directamente sería una funcion asincronica
    //Para poder lograr que una variable muestre directamente la funcion fetch deveremos esperar unos segundos a que fetch obtenga estos resultados para almacenarlos, para ellos usamos "async await"
    //"async" se usa en la funcion general y "await" para darle tiempo a fetch para que obtenga los datos
    let respuesta = await fetch(url, {
      //GET / DELETE / POST / PUT
      "method": 'GET', 
      "mode": 'no-cors',
      "headers": {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
        "Origin": 'https://lucasmoy.dev/'
      } 
    });
    let json = await respuesta.json();
    setPeliculas(json);
  }

  const getTotalPaginas = () => {
    let cantidadTotalDePeliculas = peliculas.length;
    return Math.ceil(cantidadTotalDePeliculas / total_por_pagina);
  };

  //peliculas.slice(0,5);
  let peliculasPorPagina = peliculas.slice(
    (paginaActual - 1) * total_por_pagina,
    paginaActual * total_por_pagina
  );

  return (
    <PageWrapper>
      {peliculasPorPagina.map((pelicula) => (
        <Pelicula
          img={pelicula.img}
          titulo={pelicula.titulo}
          calificacion={pelicula.calificacion}
          director={pelicula.director}
          actores={pelicula.actores}
          fecha={pelicula.fecha}
          duracion={pelicula.duracion}
        >
          {pelicula.descripcion}
        </Pelicula>
      ))}

      <Paginacion
        pagina={paginaActual}
        total={getTotalPaginas()}
        onChange={(pagina) => {
          setPaginaActual(pagina); //paginaActual se va ir renderizando a travez de setPaginaActual cada vez que hagamos click en los numeros de pagina
        }}
      />
    </PageWrapper>
  );
}

export default App;
