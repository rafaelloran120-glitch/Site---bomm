
function EnviarFofoca() {
  let fofoca = document.getElementById("fofoca").value;

  // cria um novo parágrafo
  let novaFofoca = document.createElement("p");
  novaFofoca.textContent = fofoca;

  // adiciona dentro da div "listaFofocas"
  document.getElementById("listaFofocas").appendChild(novaFofoca);

  // limpa o campo de texto
  document.getElementById("fofoca").value = "";
}
