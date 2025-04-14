// Requer Firebase: <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
// e outros serviços:
document.write('<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"><\/script>');
document.write('<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"><\/script>');

window.addEventListener('load', () => {
  const auth = firebase.auth();
  const db = firebase.firestore();

  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');
  const loginBtn = document.getElementById('loginBtn');
  const cadastroBtn = document.getElementById('cadastroBtn');
  const msg = document.getElementById('mensagem');

  if (loginBtn) loginBtn.onclick = () => {
    auth.signInWithEmailAndPassword(emailInput.value, senhaInput.value)
      .then(() => window.location.href = "dashboard.html")
      .catch(e => msg.innerText = "Erro ao entrar: " + e.message);
  };

  if (cadastroBtn) cadastroBtn.onclick = () => {
    auth.createUserWithEmailAndPassword(emailInput.value, senhaInput.value)
      .then(() => window.location.href = "dashboard.html")
      .catch(e => msg.innerText = "Erro ao criar conta: " + e.message);
  };

  const salvarBtn = document.getElementById('salvarBtn');
  if (salvarBtn) {
    salvarBtn.onclick = async () => {
      const cliente = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value,
        mercadoria: document.getElementById('mercadoria').value,
        valor: document.getElementById('valor').value
      };
      await db.collection("clientes").add(cliente);
      carregarClientes();
    };
    carregarClientes();
  }

  async function carregarClientes() {
    const lista = document.getElementById('listaClientes');
    lista.innerHTML = '';
    const snapshot = await db.collection("clientes").get();
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement('div');
      div.className = 'bg-white p-4 rounded shadow';
      div.innerHTML = `
        <p><strong>Nome:</strong> ${data.nome}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefone:</strong> ${data.telefone}</p>
        <p><strong>Endereço:</strong> ${data.endereco}</p>
        <p><strong>Mercadoria:</strong> ${data.mercadoria}</p>
        <p><strong>Valor:</strong> R$ ${data.valor}</p>
      `;
      lista.appendChild(div);
    });
  }
});
