const formAdicionar = document.querySelector("#novoItem")
const lista = document.querySelector("#lista");
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach ( (elemento) => 
    criaElemento(elemento)
)

formAdicionar.addEventListener("submit", (e) =>
 {
    console.log(botaoDeleta)
    console.log(botaoDeleta())
   e.preventDefault();

   var nome = e.target.elements["nome"].value; // o target.elements referencia aos elementos do target do evento. Você especifica o elemento dentro de ['']
   var quantidade = e.target.elements["quantidade"].value;
   var validade = e.target.elements["validade"].value;

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

   nome = "";
   quantidade = "";
   validade = "";
 })


 function criaElemento(itemAtual) {
   const novoItem = document.createElement("li");
   novoItem.classList.add("item");

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
  console.log(itens)
  itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
  localStorage.setItem("itens", JSON.stringify(itens));


}