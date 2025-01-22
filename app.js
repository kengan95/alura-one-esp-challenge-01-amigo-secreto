(() => {
    const inputAmigo = document.querySelector('#amigo'); // Referencia al input donde se ingresa el nombre del amigo
    const listaAmigos = document.querySelector('#listaAmigos'); // Referencia a la lista que almacenará a los amigos
    const amigoSecreto = document.querySelector('#resultado'); // Referencia a el espacio designado en el html para insertar el amigo secreto
    const botonSortearAmigo = document.querySelector('#btn-sortear') // Referencia al boton de sorteo para manipular sus estados
    let amigos = []; // Arreglo que almacena los nombres de los amigos
    let nombreAmigo = inputAmigo.value.trim(); 

    function limpiarCaja() {
        document.querySelector('#amigo').value = '';
    }

    const agregarAmigo = () => {

        nombreAmigo = inputAmigo.value.trim();
        
        // Validamos que si ya existe  un amigo secreto
        if(amigoSecreto.textContent != '') {
            amigoSecreto.textContent = ''; 
        }

        // Llamamos a la función de validación antes de agregar al amigo
        validarAmigo();

        // Validamos si el campo se aun posee la para errores
        if (inputAmigo.classList.contains('input-name-error')) {
            alert('Por favor, ingrese un nombre valido.')
            return;
        }
        
        // Validamos si el amigo ya se encuentra registrado
        if (amigos.includes(nombreAmigo)) {
            alert('Este amigo ya está en la lista');
            return;
        }

        limpiarCaja();
        
        // Se actualiza el array de amigos
        amigos.push(nombreAmigo); 
        actualizarListaAmigos();
        
    };

    const sortearAmigo = () => {
        if(amigos.length > 0){

            // Generamos un número aleatorio entre 0 y el tamaño del arreglo
            let random = Math.floor(Math.random() * amigos.length);

            // Asignamos el amigo secreto usando el índice aleatorio
            amigoSecreto.textContent = `El amigo secreto sorteado es: ${amigos[random]}`; 

            // Limpiamos los objetos y bloqueamos el boton de sortear
            listaAmigos.innerHTML = '';
            inputAmigo.value = '';
            amigos = [];
            eliminarError();
            botonSortearAmigo.disabled = true;
        }

    }

    const eliminarError = () => {
            // Si el campo no se enceuntra vacio eliminamos el estilo de error
            inputAmigo.classList.remove('input-name-error'); 
            inputAmigo.setAttribute('placeholder', 'Escribe un nombre');
    }

    const validarAmigo = () => {

        nombreAmigo = inputAmigo.value.trim(); // Obtenemos el nombre del amigo

        // Validamos si el campo esta vacio para aplicar estilos de error
        if (nombreAmigo === '') {
            inputAmigo.classList.add('input-name-error');
            inputAmigo.setAttribute('placeholder', 'El campo es obligatorio');
            return;
        } else {
            eliminarError();
        }
    };

    const actualizarListaAmigos = () =>{
        // Se limpia la lista de amigos para agregar los elementos 
        listaAmigos.innerHTML = '';

        // Iteramos el arreglo para agregar los elementos en la lista
        amigos.forEach((amigo) => {
            const nuevoAmigo = document.createElement('li');
            nuevoAmigo.textContent = amigo; // Se crea un elemento <li> para cada amigo
            listaAmigos.appendChild(nuevoAmigo); // Agregamos el elemento a la lista
        });

        // Desbloqueamos el boton de sortear despues de tener 1 amigo registrado
        if(botonSortearAmigo.disabled = true){
            botonSortearAmigo.disabled = false;
        }

        // Limpiamos el campo
        inputAmigo.value = '';
    }

    // creamos un evento relacionado al campo amigo para validar que cuando 
    // se pierda el foco y el campo quede vacio, añada estilo de error
    inputAmigo.addEventListener('blur', validarAmigo);

    // Creamos un evento relacionado al campo amigo para agregar
    // el amigo con una tecla especifica
    inputAmigo.addEventListener('keypress',(event) =>{
        // Verifica si la tecla presionada es Enter
        if(event.key === 'Enter'){
            // Se ejecuta la funcion para agregar al amigo
            agregarAmigo(); 
        }
    })

    window.agregarAmigo = agregarAmigo;
    window.sortearAmigo = sortearAmigo;
})();