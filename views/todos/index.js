const input = document.querySelector('input');
const ul = document.querySelector('ul');
const addBtn = document.querySelector('.add-btn');
const invalidCheck = document.querySelector('.invalid-check');
const form = document.querySelector('#form');
const totalCountSpan = document.querySelector('.total-count');
const completedCountSpan = document.querySelector('.completed-count');
const incompletedCountSpan = document.querySelector('.incompleted-count');


const totalCount = () => {
    const howMany = document.querySelector('ul').children.length;
    totalCountSpan.innerHTML = howMany;
};

const completeCount = () => {
    const howMany = document.querySelectorAll('.line-through').length;
    completedCountSpan.innerHTML = howMany;
};

const incompletedCount = () => {
    const howMany = document.querySelectorAll('ul li:not(.line-through)').length;
    incompletedCountSpan.textContent = howMany;
};

const todoCount = () => {
    totalCount();
    completeCount();
    incompletedCount();
};


form.addEventListener('submit', async e => {
    e.preventDefault();

    if (input.value === '') {
        input.classList.remove('focus:ring-2', 'focus:ring-violet-600');
        input.classList.add('focus:ring-2', 'focus:ring-rose-600');
        if (invalidCheck) invalidCheck.classList.remove('hidden');
        return;
    }

    input.classList.remove('focus:ring-2', 'focus:ring-rose-600');
    input.classList.add('focus:ring-2', 'focus:ring-violet-600');
    if (invalidCheck) invalidCheck.classList.add('hidden');

    const text = input.value;

    try {
        const { data } = await axios.post("/api/todos", { text }, { withCredentials: true });
        console.log("Tarea creada en la BD:", data);

        const listItem = document.createElement('li');
        listItem.id = data.id;
        listItem.className = 'flex flex-row';
        listItem.innerHTML = `
            <div class="group grow flex flex-row justify-between items-center">
                <button class="delete-icon w-12 md:w-14 hidden group-hover:flex group-hover:justify-center group-hover:items-center text-rose-500 hover:text-rose-400 transition cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
                <p class="p-4 wrap-break-word grow">${data.text}</p>
            </div>
            <button class="check-icon w-12 md:w-14 flex justify-center items-center cursor-pointer text-emerald-500 hover:text-emerald-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7 pointer-events-none opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
            </button>
        `;

        ul.append(listItem);

        input.value = '';
        todoCount();
    } catch (error) {
        console.error("Error al guardar la tarea:", error);
    }
});

ul.addEventListener('click', async e => {
    if (e.target.closest('.delete-icon')) {
        const li= e.target.closest('.delete-icon').parentElement.parentElement;
        await axios.delete(`/api/todos/${e.target.closest('li').id}`, { withCredentials: true });
        li.remove();
        todoCount();
    }

    if (e.target.closest('.check-icon')) {
        const checkIcon = e.target.closest('.check-icon');
        const listItem = checkIcon.parentElement;
        
        if (!listItem.classList.contains('line-through')) {
            await axios.patch(`/api/todos/${listItem.id}`, { checked: true });
            checkIcon.classList.add('bg-green-400');
            checkIcon.classList.remove('hover:bg-green-300');
            listItem.classList.add('line-through', 'text-slate-400');
        } else {
            await axios.patch(`/api/todos/${listItem.id}`, { checked: false });
            checkIcon.classList.remove('bg-green-400');
            checkIcon.classList.add('hover:bg-green-300');
            listItem.classList.remove('line-through', 'text-slate-400');
        }

        todoCount();
        localStorage.setItem('todoList', ul.innerHTML);
    }
});

// Única función autoejecutable para cargar las tareas desde la API al iniciar
(async () => {
    try {
        const { data } = await axios.get("/api/todos", { withCredentials: true });
        console.log("Tareas obtenidas de la BD:", data);
        
        ul.innerHTML = "";
        data.forEach(todo => {
            const listItem = document.createElement('li');
            listItem.id = todo.id;
            listItem.className = 'flex flex-row';
            listItem.innerHTML = `
                <div class="group grow flex flex-row justify-between items-center">
                    <button class="delete-icon w-12 md:w-14 hidden group-hover:flex group-hover:justify-center group-hover:items-center text-rose-500 hover:text-rose-400 transition cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                    <p class="p-4 wrap-break-word grow">${todo.text}</p>
                </div>
                <button class="check-icon w-12 md:w-14 flex justify-center items-center cursor-pointer text-emerald-500 hover:text-emerald-400 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7 pointer-events-none opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                </button>
            `;

            // Verificación del estado checked que viene de la base de datos
            const checkIcon = listItem.querySelector('.check-icon');
            if (todo.checked) {
                checkIcon.classList.add('bg-green-400');
                checkIcon.classList.remove('hover:bg-green-300');
                listItem.classList.add('line-through', 'text-slate-400');
            } else {
                checkIcon.classList.remove('bg-green-400');
                checkIcon.classList.add('hover:bg-green-300');
                listItem.classList.remove('line-through', 'text-slate-400');
            }

            ul.append(listItem);
        });

        todoCount();
    } catch (error) {
        console.error("Error al cargar tareas:", error);
        window.location.pathname = "/login";
    }
})();

const closeBtnDesktop = navbar.children[0].children[2].children[0];
const closeBtnMobile = navbar.children[0].children[3].children[0];

closeBtnDesktop.addEventListener("click", async e =>{
    try{
        await axios.get("/api/logout");
        window.location.pathname = "/login";
    }catch (error){
        console.log(error)
    }
});

closeBtnMobile.addEventListener("click", async e =>{
    try{
        await axios.get("/api/logout");
        window.location.pathname = "/login";
    }catch (error){
        console.log(error)
    }
});

const handleLogout = async () => {
    try {
        await axios.get("/api/logout", { withCredentials: true });
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    } finally {
        // Reemplaza la ruta actual en el historial para evitar que el botón "Atrás" regrese aquí
        window.location.replace("/login/");
    }
};

setTimeout(() => {
    const closeBtnDesktop = navbar.children[0]?.children[2]?.children[0];
    const closeBtnMobile = navbar.children[0]?.children[3]?.children[0];

    if (closeBtnDesktop) {
        closeBtnDesktop.addEventListener("click", (e) => {
            e.preventDefault();
            handleLogout();
        });
    }

    if (closeBtnMobile) {
        closeBtnMobile.addEventListener("click", (e) => {
            e.preventDefault();
            handleLogout();
        });
    }
}, 100);
