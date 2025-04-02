// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Importar la "base de datos" simulada
let empleados = require("./data");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Servir archivos desde la carpeta public

// GET - Obtener todos los empleados
app.get("/empleados", (req, res) => {
  res.json(empleados);
});

// POST - Agregar nuevo empleado
app.post("/empleados", (req, res) => {
  const nuevoEmpleado = { id: Date.now(), ...req.body };
  empleados.push(nuevoEmpleado);
  res.json(nuevoEmpleado);
});

// PUT - Actualizar empleado existente
app.put("/empleados/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = empleados.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    empleados[index] = { id, ...req.body };
    res.json(empleados[index]);
  } else {
    res.status(404).json({ message: "Empleado no encontrado" });
  }
});

// DELETE - Eliminar empleado
app.delete("/empleados/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = empleados.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    empleados.splice(index, 1);
    res.json({ wasDeleted: true });
  } else {
    res.status(404).json({ message: "Empleado no encontrado" });
  }
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
