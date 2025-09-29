function cadastrar(){
    var nome = parseInt(document.getElementById('nome').value);
    var estado = parseInt(document.getElementById('estado').value);
    var cidade = parseInt(document.getElementById('cidade').value);
    var preco = parseInt(document.getElementById('preco').value);
    var cadastrar="";

    cadastrar = (nome, estado, cidade, preco);

    alert(cadastrar);
}