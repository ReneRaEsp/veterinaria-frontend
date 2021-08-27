<template>
  <section class="section1">
    <h1 class="title">ADMINISTRADOR DE PACIENTES DE VETERINARIA</h1>
    <form id="nueva-cita" class="form" action="">
      <div class="datos">
        <h2 class="title">Datos del paciente</h2>
        <div class="group-input">
          <label class="label" for="mascota">Nombre de mascota: </label>
          <input
            v-model="mascota"
            value=""
            id="mascota"
            name="mascota"
            placeholder="Nombre de mascota"
            class="input"
            type="text"
          />
        </div>
        <div class="group-input">
          <label class="label" for="especie">Especie: </label>
          <select v-model="especie" id="especie" class="input" name="especie">
            <option class="option" value="perro">Perro</option>
            <option class="option" value="gato">Gato</option>
          </select>
        </div>
        <div class="group-input">
          <label class="label" for="propietario">Propietario: </label>
          <input
            v-model="propietario"
            id="propietario"
            placeholder="Nombre del propietario"
            class="input"
            type="text"
            name="propietario"
          />
        </div>
        <div class="group-input">
          <label class="label" for="telefono">Telefono: </label>
          <input
            v-model="telefono"
            id="telefono"
            placeholder="Número de télefono"
            class="input"
            type="text"
            name="telefono"
          />
        </div>
        <div class="group-input">
          <label class="label" for="fecha">Fecha: </label>
          <input
            v-model="fecha"
            id="fecha"
            class="input"
            name="fecha"
            type="date"
          />
        </div>
        <div class="group-input">
          <label class="label" for="hora">Hora: </label>
          <input
            v-model="hora"
            id="hora"
            name="hora"
            class="input"
            type="time"
          />
        </div>
        <div class="group-input">
          <label class="label" for="descripcion">Descripción: </label>
          <textarea
            v-model="descripcion"
            class="textarea"
            name="descripcion"
            id="descripcion"
            cols="30"
            placeholder="Motivo por el cual se agenda la cita"
            rows="7"
          ></textarea>
        </div>
        <div class="group-input">
          <p @click="limpiarCampos()" id="crear" class="button">
            Limpiar campos
          </p>
          <p @click="guardar()" id="crear" class="button">Guardar cita</p>
        </div>
      </div>
      <div id="citas" class="citas">
        <h2 class="title">Citas</h2>
        <div v-for="cita of citas" :key="cita._id" class="cita">
          <h3 class="data-mascota">{{ cita.mascota }}</h3>
          <div class="data">
            <p>
              Especie: <span class="data-especie">{{ cita.especie }}</span>
            </p>
            <p>
              Propietario:
              <span class="data-propietario">{{ cita.propietario }}</span>
            </p>
            <p>
              Telefono: <span class="data-telefono">{{ cita.telefono }}</span>
            </p>
            <p>
              Fecha: <span class="data-fecha">{{ cita.fecha }}</span>
            </p>
            <p>
              Hora: <span class="data-hora">{{ cita.hora }}</span>
            </p>
            <p>
              Descripcion:
              <span class="data-descripcion">{{ cita.descripcion }}</span>
            </p>
          </div>
          <div class="botones">
            <p @click="editarCita(cita._id)" class="editar">Editar</p>
            <p @click="eliminarCita(cita._id)" class="eliminar">Eliminar</p>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: "",
      mascota: "",
      especie: "",
      propietario: "",
      telefono: "",
      fecha: "",
      hora: "",
      descripcion: "",
      citas: [],
      isEditar: false,
    };
  },
  methods: {
    crearCita() {
      axios
        .post("cita/add", {
          mascota: this.mascota,
          especie: this.especie,
          propietario: this.propietario,
          telefono: this.telefono,
          fecha: this.fecha,
          hora: this.hora,
          descripcion: this.descripcion,
        })
        .then((response) => {
          console.log(`
                cita agregada exitosamente 
                Mascota: ${response.data.mascota} 
                Dueño: ${response.data.propietario}`);
        })
        .catch((error) => {
          console.log(error);
          alert("no se pudo agendar la cita");
        });
      this.listarCitas();
    },
    listarCitas() {
      axios
        .get("cita/list")
        .then((response) => {
          this.citas = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editarCita(_id) {
      console.log(_id);
      axios
        .get("cita/query?_id=" + _id)
        .then((response) => {
          this._id = _id;
          this.mascota = response.data.mascota;
          this.especie = response.data.especie;
          this.propietario = response.data.propietario;
          this.telefono = response.data.telefono;
          this.fecha = response.data.fecha;
          this.hora = response.data.hora;
          this.descripcion = response.data.descripcion;
          this.isEditar = true;
        })
        .catch((error) => {
          console.log(
            `Error al obtener los datos de la mascota error ${error}`
          );
        });
    },
    eliminarCita(_id) {
      axios
        .delete(`cita/remove`, { data: { _id: _id } })
        .then((response) => {
          console.log("Cita eliminada: " + response.data.mascota);
        })
        .catch((error) => {
          console.log(error);
        });
      this.listarCitas();
    },
    update() {
      axios
        .put(`cita/update`, {
          _id: this._id,
          mascota: this.mascota,
          especie: this.especie,
          propietario: this.propietario,
          telefono: this.telefono,
          fecha: this.fecha,
          hora: this.hora,
          descripcion: this.descripcion,
        })
        .then((response) => {
          console.log(
            `Cita actualizada exitosamente: ${response.data.mascota}`
          );
        })
        .catch((error) => {
          console.log(`No se pudo actualizar la cita: ${error}`);
        });
      this.listarCitas();
    },
    limpiarCampos() {
      this.mascota = "";
      this.especie = "";
      this.propietario = "";
      this.telefono = "";
      this.fecha = "";
      this.hora = "";
      this.descripcion = "";
      this.isEditar = false;
    },
    guardar() {
      this.isEditar ? this.update() : this.crearCita();
    },
  },
  created() {
    this.listarCitas();
  },
};
</script>

<style scoped lang="sass">
.section1
    width: 90vw
    height: auto
    display: flex
    margin: auto
    margin-top: 9rem
    border-radius: 20px
    flex-direction: column
    background: #f9f9f9
    justify-content: center
    .form
        display: flex
        flex-wrap: wrap
        width: 90vw
        height: auto
        border-radius: 20px 20px 20px 20px
        background: #ffffffb3
        .datos
            display: flex
            justify-content: flex-start
            align-items: flex-start
            flex-direction: column
            background: #fff
            padding: 30px
            border-radius: 20px 20px 20px 20px
            width: 45vw
            height: 42rem
            .group-input
                margin-top: 1rem
                display: flex
                justify-content: space-between
                align-content: center
                color: black
                width: 100%
                .label
                    font-size: 1.2rem
                    display: flex
                    align-self: flex-start
                .input
                    display: flex
                    align-self: flex-end
                    width: 16rem
                    padding: 7px
                    border-radius: 7px
                    border: 2px solid #000
                    .option
                        display: flex
                        align-self: flex-end
                        width: 16rem
                        padding: 17px
                        border-radius: 7px
                        border: 2px solid #000
                .textarea
                    resize: none
                    padding: 10px
                    width: 16rem
                    height: 6rem
                    border: 2px solid #000
                    border-radius: 7px
                .button
                    display: flex
                    justify-content: center
                    text-align: center
                    margin: auto
                    margin-top: 1rem
                    width: 90%
                    color: white
                    border-radius: 5px
                    font-weight: bold
                    border: 1px solid #33333300
                    padding: 10px
                    background: #3aa764
                    transition: .7s
                    cursor: pointer
                    &:hover
                        background: #9ad262
        .citas
            display: flex
            justify-content: flex-start
            align-items: flex-start
            flex-direction: column
            overflow-y: auto
            background: #1f309229
            width: 45vw
            height: 42rem
            border-radius: 20px 20px 20px 20px
            .cita
                display: flex
                flex-direction: row
                flex-wrap: wrap
                margin-right: auto
                margin-left: auto
                margin-bottom: 1rem
                width: 90%
                height: 15rem
                border-radius: 10px
                background: #633217
                padding: 10px
                .data-mascota
                    color: white
                    text-align: center
                    justify-self: center
                    align-self: center
                    margin: auto
                    width: 100%
                    height: 1rem
                .data
                    display: flex
                    flex-direction: column
                    flex-wrap: wrap
                    color: white
                    width: 80%
                    p
                        margin: 6px
                        color: #2daab8
                        font-weight: bold
                        span
                            color: white
                .botones
                    display: flex
                    flex-wrap: wrap
                    width: 20%
                    align-content: space-evenly
                    .editar, .eliminar
                        display: flex
                        justify-content: center
                        align-items: center
                        padding: auto
                        width: 100%
                        height: 2rem
                        border-radius: 4px
                        border: 1px solid #00000000
                        font-weight: bold
                        color: white
                        cursor: pointer
                        transition: .7s
                        text-align: center
                        &:hover
                            opacity: .57
                    .editar
                        background: #2aa7b0cb
                    .eliminar
                        background: #de457abf


@media screen and (max-width: 800px)
    .section1
        .form
            .datos
                width: 100%
            .citas
                width: 100%
</style>
