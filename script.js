function EnviarFofoca() {
  let fofoca = document.getElementById("fofoca").value;

  if (fofoca.trim() === "") {
    alert("Escreva alguma coisa antes de enviar!");
    return;
  }

  // Criar um novo bloco de fofoca
  let novaFofoca = document.createElement("div");
  novaFofoca.classList.add("fofoca");
  novaFofoca.textContent = fofoca;

  // Adicionar no mural
  document.getElementById("lista-fofocas").appendChild(novaFofoca);

  // Limpar a caixa de texto
  document.getElementById("fofoca").value = "";
}
