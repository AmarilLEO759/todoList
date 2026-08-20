const button = document.querySelector(".add_Btn");
const input = document.querySelector(".input_Task");
const listaCompleta = document.querySelector(".task_List");
const buttonClear = document.querySelector(".clear_Btn");

let minhaListaDeItens = [];

function adicionarNovaTarefa() {
    if (input.value.trim() === "") return;

    minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
    });

    input.value = "";

    mostrarTarefas();
}

function mostrarTarefas() {
    let novaLi = "";

    minhaListaDeItens.forEach((item, posicao) => {
    novaLi =
    novaLi +
    `
        <li class="task_Item ${item.concluida ? "done" : ""}">
            <img src="/img/checked.png" alt="checked" class="icon_Checked" onclick="concluirTarefa(${posicao})">
            <span>${item.tarefa}</span>
            <img src="/img/trash.png" alt="trash" class="icon_Trash" onclick="deletarItem(${posicao})">
        </li>
    `;
    });

    listaCompleta.innerHTML = novaLi;

    localStorage.setItem("lista", JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;

    mostrarTarefas();
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1);

    mostrarTarefas();
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem("lista");

    if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
    }

    mostrarTarefas();
}

function limparTudo() {
    minhaListaDeItens = [];
    mostrarTarefas();
}

// Inicializa a lista
recarregarTarefas();

// Eventos de clique e tecla Enter
button.addEventListener("click", adicionarNovaTarefa);
buttonClear.addEventListener("click", limparTudo);
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
    adicionarNovaTarefa();
    }
});
