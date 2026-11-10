// ===== As cinco funções =====

//Recebe três números e retorna o maior
function maiorDeTres(a, b, c) {
  let maior = a;
  if (b > maior) maior = b;
  if (c > maior) maior = c;
  return maior;
}

//Recebe três números e retorna em ordem crescente
function ordemCrescente(a, b, c) {
  return [a, b, c].sort(function (x, y) { return x - y; });
}

//Recebe uma string e retorna se é palíndromo
function ehPalindromo(texto) {
  const limpo = texto.toLowerCase().replace(/\s/g, "");
  const invertido = limpo.split("").reverse().join("");
  return limpo !== "" && limpo === invertido;
}

//Recebe duas palavras e verifica se a segunda está contida na primeira
function verificarSubconjunto(palavra1, palavra2) {
  if (
    palavra1 === undefined || palavra2 === undefined ||
    palavra1.trim() === "" || palavra2.trim() === ""
  ) {
    return "erro";
  }
  if (palavra1.includes(palavra2)) {
    return "é um subconjunto";
  }
  return "não é um subconjunto";
}

//Recebe uma data (objeto Date) e devolve o dia da semana
function diaDaSemana(data) {
  const dias = [
    "domingo", "segunda-feira", "terça-feira", "quarta-feira",
    "quinta-feira", "sexta-feira", "sábado"
  ];
  return dias[data.getDay()];
}

// ===== Ligação com a página =====

function lerNumeros(id1, id2, id3) {
  const valores = [id1, id2, id3].map(function (id) {
    return document.getElementById(id).value;
  });
  if (valores.some(function (v) { return v === ""; })) return null;
  return valores.map(Number);
}

function exercicio1() {
  const n = lerNumeros("n1a", "n1b", "n1c");
  const saida = document.getElementById("res1");
  if (!n) { saida.textContent = "Preencha os três números."; return; }
  saida.textContent = "Maior: " + maiorDeTres(n[0], n[1], n[2]);
}

function exercicio2() {
  const n = lerNumeros("n2a", "n2b", "n2c");
  const saida = document.getElementById("res2");
  if (!n) { saida.textContent = "Preencha os três números."; return; }
  saida.textContent = ordemCrescente(n[0], n[1], n[2]).join(", ");
}

function exercicio3() {
  const texto = document.getElementById("texto3").value;
  const saida = document.getElementById("res3");
  if (texto.trim() === "") { saida.textContent = "Digite um texto."; return; }
  saida.textContent = ehPalindromo(texto) ? "É palíndromo" : "Não é palíndromo";
}

function exercicio4() {
  const p1 = document.getElementById("p4a").value;
  const p2 = document.getElementById("p4b").value;
  document.getElementById("res4").textContent = verificarSubconjunto(p1, p2);
}

function exercicio5() {
  const valor = document.getElementById("data5").value; // formato AAAA-MM-DD
  const saida = document.getElementById("res5");
  if (valor === "") { saida.textContent = "Escolha uma data."; return; }
  const partes = valor.split("-");
  // new Date(ano, mês-1, dia) evita erro de fuso horário
  const data = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
  saida.textContent = diaDaSemana(data);
}