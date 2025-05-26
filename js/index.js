let dueños = [
  { id: 1, nombre: "Jolgan", cedula: "40404040", telefono: "3033334444", email: "davidpardo016@gmail.com" }
];

let mascotas = [
  { id: 2005, nombre: "Firu", especie: "Perro", edad: 4, peso: 20, estado: "Sano", cedulaDueño: "40404040" },
  { id: 2006, nombre: "Pinky", especie: "Gato", edad: 5, peso: 5, estado: "En tratamiento", cedulaDueño: "40404040" },
];

const generarId = () => Date.now() + Math.floor(Math.random());

const btnAgregarDueño = document.getElementById("agregar_dueño");
const btnAgregarPet = document.getElementById("agregar_pet");
const btnGuardarDueño = document.getElementById("guardar_dueño");
const btnGuardarPet = document.getElementById("guardar_pet");
const btnActualizarSalud = document.getElementById("actualizar_salud");
const btnEliminarMascota = document.getElementById("eliminar_mascota");
const btnVerMascotasDueño = document.getElementById("ver_mascotas_dueño");
const btnBuscarMascota = document.getElementById("buscar_mascota");
const btnListarMascotas = document.getElementById("listar_mascotas");

const formDueño = document.getElementById("form_dueño");
const formPet = document.getElementById("form_pet");
const formActualizarSalud = document.getElementById("form_actualizar_salud");
const formEliminar = document.getElementById("form_eliminar");
const formVerDueño = document.getElementById("form_ver_dueño");
const formBuscar = document.getElementById("form_buscar");

const inputNombreDueño = document.getElementById("nombre_dueño");
const inputCedulaReg = document.getElementById("cedula_reg");
const inputTelefono = document.getElementById("telefono");
const inputEmail = document.getElementById("email");
const inputNombrePet = document.getElementById("nombre_pet");
const inputEspecie = document.getElementById("especie");
const inputEdad = document.getElementById("edad");
const inputPeso = document.getElementById("peso");
const inputEstadosSalud = document.getElementById("estados_salud");
const inputCedulaPet = document.getElementById("cedula_pet");
const inputNombreActualizar = document.getElementById("nombre_actualizar");
const inputNuevoEstado = document.getElementById("nuevo_estado");
const inputNombreEliminar = document.getElementById("nombre_eliminar");
const inputCedulaVer = document.getElementById("cedula_ver");
const inputBuscarNombre = document.getElementById("buscar_nombre");

const tabla = document.getElementById("tabla_resultados");
const cuerpoTabla = tabla.querySelector("tbody");
const tablaMascotas = document.getElementById("tabla_mascotas");
const cuerpoTablaMascotas = tablaMascotas.querySelector("tbody");
const verMascotas = document.getElementById("ver_todas_mascotas");

const toggleDisplay = (form) => {
  form.style.display = form.style.display === "block" ? "none" : "block";
};

btnAgregarDueño.onclick = () => toggleDisplay(formDueño);
btnAgregarPet.onclick = () => toggleDisplay(formPet);
btnActualizarSalud.onclick = () => toggleDisplay(formActualizarSalud);
btnEliminarMascota.onclick = () => toggleDisplay(formEliminar);
btnVerMascotasDueño.onclick = () => toggleDisplay(formVerDueño);
btnBuscarMascota.onclick = () => toggleDisplay(formBuscar);
btnListarMascotas.onclick = () => {
  toggleDisplay(verMascotas);
  listarMascotas();
};

const validarDatosDueño = (datos) => {
  if (!datos.nombre || !datos.cedula || !datos.telefono || !datos.email) {
      alert("¡Por favor, completa todos los campos!");
      return false;
  }
  return true;
};

const validarDatosMascota = (datos) => {
  if (!datos.nombre || !datos.especie || isNaN(datos.edad) || isNaN(datos.peso) || !datos.estado || !datos.cedulaDueño) {
      alert("¡Por favor, completa todos los campos!");
      return false;
  }
  if (datos.edad <= 0 || datos.peso <= 0) {
      alert("Edad y peso deben ser positivos");
      return false;
  }
  return true;
};

const registrarDueño = () => {
  const datos = {
      id: generarId(),
      nombre: inputNombreDueño.value.trim(),
      cedula: inputCedulaReg.value.trim(),
      telefono: inputTelefono.value.trim(),
      email: inputEmail.value.trim(),
  };
  if (!validarDatosDueño(datos)) return;
  setTimeout(() => {
      dueños.push(datos);
      alert("Dueño registrado exitosamente ✅");
      limpiarFormularioDueño();
  }, 1500);
};

const registrarMascota = () => {
  const datos = {
      id: generarId(),
      nombre: inputNombrePet.value.trim(),
      especie: inputEspecie.value,
      edad: parseFloat(inputEdad.value),
      peso: parseFloat(inputPeso.value),
      estado: inputEstadosSalud.value,
      cedulaDueño: inputCedulaPet.value.trim(),
  };
  if (!validarDatosMascota(datos)) return;
  setTimeout(() => {
      if (!dueños.find(d => d.cedula === datos.cedulaDueño)) {
          alert("No se encontró dueño con esa cédula 🐱");
          return;
      }
      mascotas.push(datos);
      alert("Mascota registrada exitosamente 🐾");
      limpiarFormularioPet();
  }, 2000);
};

const limpiarFormularioDueño = () => {
  inputNombreDueño.value = "";
  inputCedulaReg.value = "";
  inputTelefono.value = "";
  inputEmail.value = "";
  formDueño.style.display = "none";
};

const limpiarFormularioPet = () => {
  inputNombrePet.value = "";
  inputEspecie.value = "";
  inputEdad.value = "";
  inputPeso.value = "";
  inputEstadosSalud.value = "";
  inputCedulaPet.value = "";
  formPet.style.display = "none";
};

const actualizarEstadoSalud = () => {
  const nombre = inputNombreActualizar.value.trim();
  const estado = inputNuevoEstado.value;

  if (!nombre || !estado) {
      alert("Por favor, completa todos los campos.");
      return;
  }
  setTimeout(() => {
      const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
      if (mascota) {
          mascota.estado = estado;
          alert("Estado De Salud Actualizada ^_^");
          limpiarFormularioActualizarSalud();
      } else {
          alert("Mascota no encontrada ❌");
      }
  }, 1000);
};

const eliminarMascota = () => {
  const nombre = inputNombreEliminar.value.trim();

  if (!nombre) {
      alert("Por favor, ingresa el nombre de la mascota a eliminar.");
      return;
  }
  setTimeout(() => {
      const index = mascotas.findIndex(m => m.nombre.toLowerCase() === nombre.toLowerCase());
      if (index !== -1) {
          mascotas.splice(index, 1);
          alert("Mascota eliminada exitosamente ✅");
          limpiarFormularioEliminar();
      } else {
          alert("Mascota no encontrada ❌");
      }
  }, 2000);
};

const verMascotasDeDueño = () => {
  const cedula = inputCedulaVer.value.trim();
  const tablaMascotasDueño = document.getElementById("tabla_mascotas_dueño");
  const cuerpoTablaMascotasDueño = document.getElementById("cuerpo_tabla_mascotas_dueño");

  if (!cedula) {
      alert("Por favor, ingresa la cédula del dueño.");
      return;
  }

  setTimeout(() => {
      const mascotasDueño = mascotas.filter(m => m.cedulaDueño === cedula);
      
      cuerpoTablaMascotasDueño.innerHTML = "";

      if (mascotasDueño.length > 0) {
          mascotasDueño.forEach(mascota => {
              const fila = document.createElement("tr");
              fila.innerHTML = `
                  <td>${mascota.nombre}</td>
                  <td>${mascota.especie}</td>
                  <td>${mascota.edad} años</td>
                  <td>${mascota.peso}</td>
                  <td>${mascota.estado}</td>
              `;
              cuerpoTablaMascotasDueño.appendChild(fila);
          });

          tablaMascotasDueño.style.display = "table";
      } else {
          cuerpoTablaMascotasDueño.innerHTML = "";
          alert("No se encontraron mascotas para ese dueño ❌");
      }
  }, 2000);
};

const buscarMascota = () => {
  const nombre = inputBuscarNombre.value.trim();

  if (!nombre) {
      alert("Por favor, ingresa el nombre de la mascota que deseas buscar.");
      return;
  }
  setTimeout(() => {
      const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
      if (mascota) {
          cuerpoTabla.innerHTML = "";
          const fila = document.createElement("tr");
          fila.innerHTML = `
              <td>${mascota.nombre}</td>
              <td>${mascota.especie}</td>
              <td>${mascota.edad}</td>
              <td>${mascota.peso}</td>
              <td>${mascota.estado}</td>
              <td>${mascota.cedulaDueño}</td>
          `;
          cuerpoTabla.appendChild(fila);
          tabla.style.display = "table";
      } else {
          alert("Mascota no encontrada ❌");
          tabla.style.display = "block";
      }
  }, 1500);
};

const listarMascotas = () => {
  setTimeout(() => {
      if (mascotas.length > 0) {
          cuerpoTablaMascotas.innerHTML = "";
          mascotas.forEach(m => {
              const dueño = dueños.find(d => d.cedula === m.cedulaDueño);
              const fila = document.createElement("tr");
              fila.innerHTML = `
                  <td>${dueño.nombre}</td>
                  <td>${m.nombre}</td>
                  <td>${m.especie}</td>
                  <td>${m.edad}</td>
                  <td>${m.peso}</td>
                  <td>${m.estado}</td>
                  <td>${m.cedulaDueño}</td>
              `;
              cuerpoTablaMascotas.appendChild(fila);
          });
          tablaMascotas.style.display = "table";
      } else {
          alert("No hay Mascotas");
          tablaMascotas.style.display = "none";
      }
  });
};

const limpiarFormularioActualizarSalud = () => {
  inputNombreActualizar.value = "";
  inputNuevoEstado.value = "";
  formActualizarSalud.style.display = "none";
};

const limpiarFormularioEliminar = () => {
  inputNombreEliminar.value = "";
  formEliminar.style.display = "none";
};

const limpiarFormularioVerDueño = () => {
  inputCedulaVer.value = "";
  formVerDueño.style.display = "none";
};

const limpiarFormularioBuscar = () => {
  inputBuscarNombre.value = "";
  formBuscar.style.display = "none";
};

btnGuardarDueño.onclick = registrarDueño;
btnGuardarPet.onclick = registrarMascota;
document.getElementById("guardar_actualizar").onclick = actualizarEstadoSalud;
document.getElementById("guardar_eliminar").onclick = eliminarMascota;
document.getElementById("guardar_ver").onclick = verMascotasDeDueño;
document.getElementById("guardar_buscar").onclick = buscarMascota;
formBuscar.onsubmit = (e) => {
  e.preventDefault();
  buscarMascota();
};