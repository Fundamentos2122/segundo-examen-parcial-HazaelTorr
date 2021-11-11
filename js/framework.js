//Variables modal
const attr_toggle = "data-toggle";
const attr_target = "data-target";
const attr_dismiss = "data-dismiss";
const class_modal = "modal";
const class_show = "show";

const class_message = "message-error"

//variables Tarea nueva
const tareaForm = document.forms["tareaForm"];
const tareaList = document.getElementById("tareas");
const tareasKey = "tareas";

//Variables Dropdown Tareas
const dropdown_class = "dropdown"
const dropdown_toggle = "dropdown-toggle";
const dropdown_menu_class = "dropdown-menu";
const navbar_toggle = "navbar-toggle";
const container_class = "container"

eventListener();

function eventListener() {
    //Agregar tarea
    tareaForm.addEventListener("submit", addTarea);

    //La Página termine de cargar
    document.addEventListener("DOMContentLoaded", showTareas);
}

//Agregar una tarea
function addTarea(e) {
    //Detener el envío del formulario
    e.preventDefault();

    //Obtener la información del formulario
    const arrayInfo = [tareaForm["titulo"].value,
                       tareaForm["descrip"].value,
                       tareaForm["fecha"].value]

    if (arrayInfo[0] == "" || arrayInfo[1] == "" || arrayInfo[2] == "") {
        ShowErrorMessage(e);
    }

    // const titulo = tareaForm["titulo"].value;
    // const descripción = tareaForm["descrip"].value;
    // const fecha = tareaForm["fecha"].value;

    //Crear el nuevo elemento
    const nuevaTarea = document.createElement("div");

    //Añadir estilos y contenido
    nuevaTarea.className = "col-12 col-sm-12 border-top border-secondary dropdown-item";
    nuevaTarea.innerHTML =
            `<div id="complete">
                <div class="row space_between_items aling-items-start">
                    <h4 class="col-8 col-sm-8" >${arrayInfo[0]}</h4>
                    <p class="col-4 col-sm-4 date-text padding_right">${arrayInfo[1]}</p>
                </div>
                <div class="col-12 col-sm-12 padding_container">
                    <p class="">${arrayInfo[2]}</p>
                </div>
                <div >
                    <div class="col-12 col-sm-12 aling-items-end">
                        <label for="comp">Completada</label>
                        <input type="checkbox" onChange="checkComplete(complete)" name="comp">
                    </div>
                </div>
            <div/>`;
    
    //Se añade a la lista de Tareas
    tareaList.appendChild(nuevaTarea);
    saveTarea(arrayInfo);
}

//Guardar tarea en LocalStorage
function saveTarea(arrayInfo) {
    let tareas = getTarea();

    //Añade a la lista de tareas
    tareas.push(arrayInfo);

    //Guardar el LocalStorage
    localStorage.setItem(tareasKey, JSON.stringify(arrayInfo));
}

//Obtiene las tareas de LocalStorage
function getTarea() {
    let tareas = localStorage.getItem(tareasKey);

    //verificamos si existe al menos uno
    if (tareas == null)
    {
        tareas = [];
    }
    else
    {
        tareas = JSON.parse(tareas);
    }
    return tareas;
}

//Muestra las tareas guardadas
function showTareas() {
    let tareas = getTarea();

    let index = 0;
    tareas.forEach(arrayInfo, index => {
        //Crear nuevo elemento
        const nuevaTarea = document.createElement("div");

        //Añadir estilos y contenido
        nuevaTarea.className = "col-12 col-sm-12 border-top border-secondary dropdown-item";
        nuevaTarea.innerHTML =
            `<div id="complete">
                <div class="row space_between_items aling-items-start">
                    <h4 class="col-8 col-sm-8" >${arrayInfo[index]}</h4>
                    <p class="col-4 col-sm-4 date-text padding_right">${arrayInfo[index+1]}</p>
                </div>
                <div class="col-12 col-sm-12 padding_container">
                    <p class="">${arrayInfo[index-1]}</p>
                </div>
                <div >
                    <div class="col-12 col-sm-12 aling-items-end">
                        <label for="comp">Completada</label>
                        <input type="checkbox" onChange="checkComplete(complete)" name="comp">
                    </div>
                </div>
            <div/>`;
        index += 1;
        //Se añade a la lista de tareas
        tareaList.appendChild(nuevaTarea);
    })
}

document.addEventListener("DOMContentLoaded", function() {
    //Botones que abren un modal
    let modal_open_buttons = document.querySelectorAll(`[${attr_toggle}='${class_modal}']`)

    modal_open_buttons.forEach(element => {
        element.addEventListener("click", OpenModal);
    });

    //Botones que cierran un modal
    let modal_close_buttons = document.querySelectorAll(`[${attr_dismiss}]`)

    modal_close_buttons.forEach(element => {  
        element.addEventListener("click", CloseModal);
    });

    //Collapse del menu
    let collapse_lista_tareas = document.querySelectorAll(`.${navbar_toggle}`)

    collapse_lista_tareas.forEach(element => {  
        element.addEventListener("change", ToggleDropdown);
    });

})

/**
 * Muestra un modal
 * @param {PointerEvent} e 
 */
 function OpenModal(e) {
    //Obtener el selector del elemento a mostrar
    let modal_selector = e.target.getAttribute(attr_target);

    //Obtener el elemento del DOM
    let modal = document.querySelector(modal_selector);

    //Agregar la clase para mostrar el modal
    modal.classList.add(class_show);
}

/**
 * Cerrar un modal
 * @param {PointerEvent} e 
 */
 function CloseModal(e) {
    //Obtener el selector del elemento a ocultar
    let modal_selector = e.target.getAttribute(attr_dismiss);

    //Obtener el elemento del DOM
    let modal = document.querySelector(modal_selector);

    //Quitar la clase para mostrar el modal
    modal.classList.remove(class_show);
}

// Mostrar lista de tareas
function ToggleDropdown(e) {
    e.preventDefault();

    console.log("entro");

    let listTareas = e.target.parentNode.querySelector(`.${dropdown_menu_class}`);

    listTareas.classList.toggle(class_show);
}

function ShowErrorMessage(e) {
    //Obtener el selector del elemento a mostrar
    let modal_selector = e.target.getAttribute(class_message);

    let modal = document.querySelector(modal_selector);

    modal.classList.add(class_show);
}

//Cambiar fondo en checkbox tarea completa
function checkComplete(e) {
    e.classList.toggle('green')
}