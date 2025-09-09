function enviarFofoca() {
  let campo = document.getElementById("fofoca");
  let texto = campo.value;

  if (texto.trim() === "") {
    alert("Escreva uma fofoca antes de postar!");
    return;
  }

  let lista = document.getElementById("listaFofocas");

  // cria uma nova fofoca
  let novaFofoca = document.createElement("div");
  novaFofoca.classList.add("fofoca");
  novaFofoca.innerText = texto;

  // adiciona no topo
  lista.prepend(novaFofoca);

  // limpa o campo
  campo.value = "";
}
