const formAdicionar = document.querySelector("#novoItem")
const lista = document.querySelector("#lista");
const listaItens = document.querySelectorAll("li")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach ( (elemento) => {
    criaElemento(elemento)
  });
    

formAdicionar.addEventListener("submit", (e) =>
 {
    e.preventDefault();

   var nome = e.target.elements["nome"].value; // o target.elements referencia aos elementos do target do evento. Você especifica o elemento dentro de ['']
   var quantidade = e.target.elements["quantidade"].value;
   var validade = converteValidade(e.target.elements["validade"].value)

   const existe = itens.find(elemento => elemento.nome === nome)

     const itemAtual = {
       nome: nome,
       quantidade: quantidade,
       validade: validade,
     };

   if (existe) {
      itemAtual.id = existe.id
      atualizaElemento(itemAtual)

      itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
      
   } else {
      itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0
      criaElemento(itemAtual);
      itens.push(itemAtual);
   }

    localStorage.setItem("itens", JSON.stringify(itens));

   document.querySelector('#nome').value = "";
   document.querySelector('#quantidade').value = "";
   document.querySelector('#validade').value = "";
 })


 function criaElemento(itemAtual) {
   const novoItem = document.createElement("li");
   novoItem.classList.add("item");
   if (verificaValidade(itemAtual.validade)) {
    novoItem.classList.add("vencido")
   }

   const criaDiv = document.createElement('div')
   
   const quantidadeItem = document.createElement('strong');
   quantidadeItem.innerHTML = itemAtual.quantidade
   quantidadeItem.dataset.id = itemAtual.id

   const nomeItem = document.createElement('p')
   nomeItem.innerHTML = itemAtual.nome;

   criaDiv.appendChild(quantidadeItem);
   criaDiv.appendChild(nomeItem);

   const validadeItem = document.createElement('strong');
   validadeItem.classList.add("validade")
   validadeItem.dataset.id = itemAtual.nome;
   validadeItem.innerHTML = `Validade: ${itemAtual.validade}`
     
   novoItem.appendChild(criaDiv)
   novoItem.appendChild(validadeItem)
   novoItem.appendChild(botaoDeleta(itemAtual.id));

   lista.appendChild(novoItem)

 }

 function atualizaElemento(item) {
  document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade;
  document.querySelector(
    `[data-id="${item.nome}"]`
  ).innerHTML = `Validade: ${item.validade}`;
 }
 
function botaoDeleta(id) {
  const elementoBotao = document.createElement("button")
  elementoBotao.innerText = "X"
  elementoBotao.addEventListener("click", function() {
    deletaElemento(this.parentNode, id)
  })
  return elementoBotao
}

function deletaElemento(tag, id) {
  tag.remove()
  itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
  localStorage.setItem("itens", JSON.stringify(itens));

}

function converteValidade(data) {

    if(data){
      const validade = new Date(data.replace(/-/g, "/"));

      let validadeConvertida = `${validade.getDate()}/${
        validade.getMonth() + 1
      }/${validade.getFullYear()}`;
      return validadeConvertida;
    }
    else  
        return 'Indeterminado'
    
}

function verificaValidade(data) {
    const dataAtual = new Date();
    const arrayData = data.split('/');
    const dataConvertida = `${arrayData[1]}-${arrayData[0]}-${arrayData[2]}`;
    const validade = new Date(dataConvertida);
    

    return dataAtual > validade
}