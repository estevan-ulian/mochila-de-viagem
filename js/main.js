const form = document.getElementById('novoItem')
const nome = document.querySelector('#nome')
const quantidade = document.querySelector('#quantidade')

const lista = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem('Itens')) || []

itens.forEach((element) => {
    createElement(element)
})

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const existe = itens.find(element => element.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id

        updateElement(itemAtual)

        itens[itens.findIndex(element => element.id === existe.id)] = itemAtual

    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length + 1]) : 0

        createElement(itemAtual)

        itens.push(itemAtual)

    }

    localStorage.setItem('Itens', JSON.stringify(itens))

    nome.value = ''
    quantidade.value = ''
})

function createElement(item) {
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    novoItem.appendChild(buttonDelete(item.id))

    lista.appendChild(novoItem)
}

function updateElement(item) {
    const itemAtualizado = document.querySelector(`[data-id='${item.id}']`)
    itemAtualizado.innerHTML = item.quantidade
}

function buttonDelete(id) {
    const botao = document.createElement('button')
    botao.classList.add('deleteItem')
    botao.innerText = 'X'

    botao.addEventListener('click', function () {
        deleteElement(this.parentNode, id)
    })

    return botao
}

function deleteElement(tag, id) {
    tag.remove(tag)

    const itemClicado = itens.findIndex(element => element.id === id)

    itens.splice(itemClicado, 1)

    localStorage.setItem('Itens', JSON.stringify(itens))
}
