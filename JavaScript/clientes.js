document.addEventListener('DOMContentLoaded', function () {
    displayClientes();
  });
  
  function displayClientes() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const clientesList = document.getElementById('clientes-list');
  
    if (users.length === 0) {
      clientesList.innerHTML = '<p>Nenhum cliente registrado.</p>';
    } else {
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `Email: ${user.email}`;
        clientesList.appendChild(listItem);
      });
    }
  }
  