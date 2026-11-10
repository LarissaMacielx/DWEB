const TOTAL = 45;
let pessoas = [];

const campoIdade = document.getElementById("idade");
const campoSexo = document.getElementById("sexo");
const campoOpiniao = document.getElementById("opiniao");
const erro = document.getElementById("erro");
const contador = document.getElementById("contador");
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");
const lista = document.getElementById("lista");

function atualizarProgresso() {
  const atual = Math.min(pessoas.length + 1, TOTAL);
  contador.textContent = "Pessoa " + atual + " de " + TOTAL;
}

function adicionarPessoa() {
  const idade = Number(campoIdade.value);
  const sexo = campoSexo.value;
  const opiniao = Number(campoOpiniao.value);

  if (campoIdade.value === "" || !Number.isInteger(idade) || idade < 0 || idade > 120) {
    erro.textContent = "Informe uma idade inteira entre 0 e 120.";
    campoIdade.focus();
    return;
  }
  if (sexo === "") {
    erro.textContent = "Selecione o sexo.";
    campoSexo.focus();
    return;
  }
  if (!opiniao) {
    erro.textContent = "Selecione a opinião.";
    campoOpiniao.focus();
    return;
  }

  erro.textContent = "";
  pessoas.push({ idade: idade, sexo: sexo, opiniao: opiniao });

  campoIdade.value = "";
  campoSexo.value = "";
  campoOpiniao.value = "";

  if (pessoas.length === TOTAL) {
    mostrarResultado();
  } else {
    atualizarProgresso();
    campoIdade.focus();
  }
}

function preencherTeste() {
  const sexos = ["F", "M", "O"];
  while (pessoas.length < TOTAL) {
    pessoas.push({
      idade: Math.floor(Math.random() * 70) + 10,
      sexo: sexos[Math.floor(Math.random() * sexos.length)],
      opiniao: Math.floor(Math.random() * 4) + 1
    });
  }
  mostrarResultado();
}

function calcular() {
  const idades = pessoas.map(function (p) { return p.idade; });
  const soma = idades.reduce(function (acc, i) { return acc + i; }, 0);

  const contar = function (campo, valor) {
    return pessoas.filter(function (p) { return p[campo] === valor; }).length;
  };

  const otimo = contar("opiniao", 4);
  const bom = contar("opiniao", 3);

  return {
    media: soma / pessoas.length,
    maisVelha: Math.max.apply(null, idades),
    maisNova: Math.min.apply(null, idades),
    pessimo: contar("opiniao", 1),
    porcOtimoBom: ((otimo + bom) / pessoas.length) * 100,
    mulheres: contar("sexo", "F"),
    homens: contar("sexo", "M"),
    outros: contar("sexo", "O")
  };
}

function mostrarResultado() {
  const r = calcular();
  const itens = [
    ["Média de idade", r.media.toFixed(1) + " anos"],
    ["Pessoa mais velha", r.maisVelha + " anos"],
    ["Pessoa mais nova", r.maisNova + " anos"],
    ["Responderam péssimo", r.pessimo],
    ["Responderam ótimo ou bom", r.porcOtimoBom.toFixed(1) + "%"],
    ["Mulheres", r.mulheres],
    ["Homens", r.homens],
    ["Outros", r.outros]
  ];

  lista.innerHTML = "";
  itens.forEach(function (item) {
    const linha = document.createElement("div");
    linha.className = "linha";
    linha.textContent = item[0] + ": " + item[1];
    lista.appendChild(linha);
  });

  formulario.classList.add("oculto");
  resultado.classList.remove("oculto");
}

function reiniciar() {
  pessoas = [];
  erro.textContent = "";
  resultado.classList.add("oculto");
  formulario.classList.remove("oculto");
  atualizarProgresso();
  campoIdade.focus();
}

document.getElementById("btnAdicionar").addEventListener("click", adicionarPessoa);
document.getElementById("btnExemplo").addEventListener("click", preencherTeste);
document.getElementById("btnReiniciar").addEventListener("click", reiniciar);
formulario.addEventListener("keydown", function (e) {
  if (e.key === "Enter") adicionarPessoa();
});

atualizarProgresso();