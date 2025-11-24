<template>
  <div class="page-container">

    <!-- TÍTULO -->
    <h1 class="titulo">
      🏀 Gestión de Entrenadores
    </h1>

    <!-- FORMULARIO -->
    <div class="form-box">
      <h2 class="subtitulo">Agregar / Editar Entrenador</h2>

      <div class="form-grid">
        <div>
          <label>Nombre</label>
          <input v-model="form.Nombre" class="input" type="text" />
        </div>

        <div>
          <label>Experiencia (años)</label>
          <input v-model.number="form.Experiencia" class="input" type="number" />
        </div>

        <div>
          <label>ID del Equipo</label>
          <input v-model.number="form.EquipoId" class="input" type="number" />
        </div>
      </div>

      <button class="btn-insert" @click="guardarEntrenador">
        {{ form.Id === 0 ? 'INSERTAR ENTRENADOR' : 'GUARDAR CAMBIOS' }}
      </button>
    </div>

    <!-- LISTA DE ENTRENADORES -->
    <h2 class="subtitulo-lista">Entrenadores Registrados</h2>

    <div class="cards-container">
      <div v-for="e in entrenadores" :key="e.Id" class="card">

        <h3 class="card-title">Entrenador #{{ e.Id }}</h3>

        <p><strong>Nombre:</strong> {{ e.Nombre }}</p>
        <p><strong>Experiencia:</strong> {{ e.Experiencia }} años</p>
        <p><strong>Equipo ID:</strong> {{ e.EquipoId }}</p>

        <div class="buttons">
          <button class="btn-edit" @click="cargarEntrenador(e)">EDITAR</button>
          <button class="btn-delete" @click="eliminarEntrenador(e.Id)">ELIMINAR</button>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        Id: 0,
        Nombre: "",
        Experiencia: 0,
        EquipoId: 0
      },
      entrenadores: []
    };
  },

  mounted() {
    this.obtenerEntrenadores();
  },

  methods: {
    async obtenerEntrenadores() {
      const res = await fetch("http://localhost:49986/ApiLiga/Obtener/Entrenadores");
      this.entrenadores = await res.json();
    },

    cargarEntrenador(ent) {
      this.form = { ...ent };
    },

    async guardarEntrenador() {
      const url = this.form.Id === 0
        ? "http://localhost:49986/ApiLiga/Insertar/Entrenador"
        : `http://localhost:49986/ApiLiga/Actualizar/Entrenador/${this.form.Id}`;

      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.form)
      });

      this.form = { Id: 0, Nombre: "", Experiencia: 0, EquipoId: 0 };
      this.obtenerEntrenadores();
    },

    async eliminarEntrenador(id) {
      await fetch(`http://localhost:49986/ApiLiga/Eliminar/Entrenador/${id}`, {
        method: "DELETE"
      });

      this.obtenerEntrenadores();
    }
  }
};
</script>

<style scoped>
.page-container {
  max-width: 1100px;
  margin: auto;
  padding: 40px 20px;
}

/* TITULO */
.titulo {
  text-align: center;
  font-size: 32px;
  margin-bottom: 25px;
}

/* FORMULARIO */
.form-box {
  background: linear-gradient(90deg, #ff7b00, #ff4500);
  padding: 25px;
  border-radius: 20px;
  color: white;
  text-align: center;
  margin-bottom: 40px;
}

.subtitulo {
  margin-bottom: 15px;
  font-size: 22px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.input {
  width: 100%;
  padding: 8px;
  border-radius: 10px;
  border: none;
}

.btn-insert {
  margin-top: 20px;
  width: 100%;
  background: black;
  color: white;
  padding: 12px;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
}

/* LISTA DE CARDS */
.subtitulo-lista {
  text-align: center;
  font-size: 24px;
  margin-bottom: 15px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  background: white;
  padding: 20px;
  width: 260px;
  border-radius: 20px;
  box-shadow: 0px 4px 10px #00000020;
  text-align: center;
}

.card-title {
  margin-bottom: 10px;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

.btn-edit {
  background: orange;
  padding: 8px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.btn-delete {
  background: red;
  padding: 8px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  color: white;
  cursor: pointer;
}
</style>
