async function cargarEmpleados() {
  const res = await fetch("/empleados");
  const empleados = await res.json();
  const lista = document.getElementById("listaEmpleados");
  lista.innerHTML = "";
  empleados.forEach((emp) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <img src="${emp.avatar}" width="50" height="50" />
        <strong>${emp.name}</strong> (${emp.username}) - ${emp.gamertag}
        <button onclick="borrar(${emp.id})">Eliminar</button>
      `;
    lista.appendChild(li);
  });
}

async function agregarEmpleado(e) {
  e.preventDefault();
  const nuevo = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    name: document.getElementById("name").value,
    avatar: document.getElementById("avatar").value,
    gamertag: document.getElementById("gamertag").value,
  };
  await fetch("/empleados", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevo),
  });
  document.getElementById("formEmpleado").reset();
  cargarEmpleados();
}

async function borrar(id) {
  await fetch(`/empleados/${id}`, { method: "DELETE" });
  cargarEmpleados();
}

document
  .getElementById("formEmpleado")
  .addEventListener("submit", agregarEmpleado);
cargarEmpleados();
