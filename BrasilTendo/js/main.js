// Atualiza o ano no rodapé
var anoSpan = document.getElementById("ano");
var anoSpan2 = document.getElementById("ano2");
var anoSpan3 = document.getElementById("ano3");
var anoSpan4 = document.getElementById("ano4");
var anoSpan5 = document.getElementById("ano5");

var anoAtual = new Date().getFullYear();

if (anoSpan) anoSpan.innerHTML = anoAtual;
if (anoSpan2) anoSpan2.innerHTML = anoAtual;
if (anoSpan3) anoSpan3.innerHTML = anoAtual;
if (anoSpan4) anoSpan4.innerHTML = anoAtual;
if (anoSpan5) anoSpan5.innerHTML = anoAtual;

// Busca de produtos (bem simples mesmo)
var busca = document.getElementById("busca");

if (busca) {
    busca.onkeyup = function() {
        var texto = busca.value.toLowerCase();
        var produtos = document.getElementsByClassName("produto");

        for (var i = 0; i < produtos.length; i++) {
            var nome = produtos[i].getAttribute("data-nome").toLowerCase();

            if (nome.indexOf(texto) > -1) {
                produtos[i].style.display = "";
            } else {
                produtos[i].style.display = "none";
            }
        }
    };
}

// Botão limpar busca
var limpar = document.getElementById("limpar");

if (limpar) {
    limpar.onclick = function() {
        busca.value = "";
        busca.onkeyup();
    };
}

// Carrinho básico (bem básico MESMO)
var botoes = document.getElementsByClassName("adicionar");
var listaCarrinho = document.getElementById("carrinho-lista");
var totalEl = document.getElementById("total");
var total = 0;

for (var j = 0; j < botoes.length; j++) {
    botoes[j].onclick = function() {
        var card = this.parentNode;
        var nomeProduto = card.getElementsByTagName("h3")[0].innerHTML;
        var precoTexto = card.getElementsByTagName("p")[0].innerHTML;

        precoTexto = precoTexto.replace("R$ ", "").replace(",", ".");
        var preco = parseFloat(precoTexto);

        var li = document.createElement("li");
        li.innerHTML = nomeProduto + " - R$ " + preco.toFixed(2).replace(".", ",");

        listaCarrinho.appendChild(li);

        total = total + preco;
        totalEl.innerHTML = total.toFixed(2).replace(".", ",");
    };
}

// Formulário de contato (super simples)
var form = document.getElementById("form-contato");

if (form) {
    form.onsubmit = function(e) {
        e.preventDefault();

        var nome = document.getElementById("nome").value;
        var email = document.getElementById("email").value;
        var mensagem = document.getElementById("mensagem").value;
        var resposta = document.getElementById("resposta-form");

        if (nome == "" || email == "" || mensagem == "") {
            resposta.innerHTML = "Preencha tudo aí, por favor.";
        } else {
            resposta.innerHTML = "Mensagem enviada! (Simulação)";
            form.reset();
        }
    };
}
