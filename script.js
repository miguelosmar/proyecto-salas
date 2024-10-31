import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyCilvmAXHJEylSmb8MiC4bTOYeq1P1CXV4",
  authDomain: "ingenieria-de-software-2dbe9.firebaseapp.com",
  projectId: "ingenieria-de-software-2dbe9",
  storageBucket: "ingenieria-de-software-2dbe9.appspot.com",
  messagingSenderId: "898931722677",
  appId: "1:898931722677:web:b1de278ed3fa3ec9adf1fc",
  measurementId: "G-D5FNJP2DQ9"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Obtiene todos los usuarios
async function getUsers() {
const usersCol = collection(db, 'usuarios');
const usersSnapshot = await getDocs(usersCol);
const usersList = usersSnapshot.docs.map(doc => doc.data());
return usersList;
}

// Arreglo para almacenar usuarios registrados temporalmente (luego se usará Firebase)
let usuarios = await getUsers();

console.log("Usuarios",usuarios)
// Función para alternar entre login y registro
document.getElementById('go-register').addEventListener('click', function() {
  document.getElementById('login-form').classList.add('d-none');
  document.getElementById('register-form').classList.remove('d-none');
});

document.getElementById('go-login').addEventListener('click', function() {
  document.getElementById('register-form').classList.add('d-none');
  document.getElementById('login-form').classList.remove('d-none');
});

// Función para registrar usuario
document.getElementById('form-register').addEventListener('submit', async function(event) {
  event.preventDefault();

  const nombre = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const departamento = document.getElementById('department').value;

  if (password === confirmPassword) {

    try {
      let nuevoUsuario =  {
        id_departamento: departamento,
        nombre: nombre,
        correo: email,
        contrasena: password,
      }
      const docRef = await addDoc(collection(db, "usuarios"),nuevoUsuario);
      console.log("Documento guardado ID: ", docRef.id);
      usuarios.push(nuevoUsuario);

    } catch (e) {
      console.error("Error al guardar documento: ", e);
    }

    // Mensaje de registro exitoso
    alert('Registro exitoso. Ahora puedes iniciar sesión.');

    // Limpiar formulario y mostrar login
    document.getElementById('form-register').reset();
    document.getElementById('register-form').classList.add('d-none');
    document.getElementById('login-form').classList.remove('d-none');
  } else {
    alert('Las contraseñas no coinciden.');
  }
});

// Función para iniciar sesión
document.getElementById('form-login').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Aquí simulas la validación contra la "base de datos" local (luego se integrará con Firebase)
  const usuario = usuarios.find(user => user.correo === email && user.contrasena === password);

  if (usuario) {
    alert(`Bienvenido, ${usuario.nombre}`);

    // Redirigir a menu.html una vez iniciada sesión
    window.location.href = 'menu.html';
  } else {
    alert('Correo o contraseña incorrectos.');
  }
});
