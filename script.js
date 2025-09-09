function EnviarFofoca() {
  let fofoca = document.getElementById("fofoca").value;

  if (fofoca.trim() !== "") { // não deixa vazio
    let lista = document.getElementById("listaFofocas");

    let novaFofoca = document.createElement("p"); // cria linha nova
    novaFofoca.textContent = fofoca;

    lista.appendChild(novaFofoca); // joga dentro da div

    document.getElementById("fofoca").value = ""; // limpa textarea
  } else {
    alert("Escreve alguma fofoca antes de enviar 😅");
  }
}
