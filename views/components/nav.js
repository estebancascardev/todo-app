const navbar = document.querySelector("#navbar");

const createNavHome = () => {
    navbar.innerHTML = `
            <div class="max-w-7xl mx-auto bg-indigo-400 h-16 flex items-center px-4 justify-between">
            <p class="font-bold text-xl text-white">Lista de Tareas</p>

            <!-- Version Mobile -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-indigo-800 rounded-lg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <!-- Version Desktop -->
            <div class="hidden md:flex">
                <a href="/login/" class="transition ease-in-out text-white hover:bg-indigo-600 py-2 px-4 rounded-lg font-bold">Login</a>
                <a href="/signup/" class="transition ease-in-out bg-indigo-200 hover:bg-indigo-400 py-2 px-4 rounded-lg font-bold">Register</a>
            </div>

            <!-- Version Mobile -->
            <div class="bg-slate-900/60 fixed top-16 right-0 left-0 bottom-0 pt-16 flex justify-center items-center flex-col gap-4 hidden">
                <a href="/login/" class="transition ease-in-out text-white hover:bg-indigo-600 py-2 px-4 rounded-lg font-bold">Login</a>
                <a href="/singup/" class="transition ease-in-out bg-indigo-200 hover:bg-indigo-400 py-2 px-4 rounded-lg font-bold">Register</a>
            </div>  
        </div>
        `;
};

const createNavSignup = () => {
    navbar.innerHTML = `
            <div class="max-w-7xl mx-auto bg-indigo-400 h-16 flex items-center px-4 justify-between">
            <p class="font-bold text-xl text-white">Lista de Tareas</p>

            <!-- Version Mobile -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-indigo-800 rounded-lg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <!-- Version Desktop -->
            <div class="hidden md:flex">
                <a href="/login/" class="transition ease-in-out text-white hover:bg-indigo-600 py-2 px-4 rounded-lg font-bold">Login</a>
            </div>

            <!-- Version Mobile -->
            <div class="bg-slate-900/60 fixed top-16 right-0 left-0 bottom-0 pt-16 flex justify-center items-center flex-col gap-4 hidden">
                <a href="/login/" class="transition ease-in-out text-white hover:bg-indigo-600 py-2 px-4 rounded-lg font-bold">Login</a>
            </div>  
        </div>
        `;
};

const createNavLogin = () => {
    navbar.innerHTML = `
            <div class="max-w-7xl mx-auto bg-indigo-400 h-16 flex items-center px-4 justify-between">
            <p class="font-bold text-xl text-white">Lista de Tareas</p>

            <!-- Version Mobile -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-indigo-800 rounded-lg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <!-- Version Desktop -->
            <div class="hidden md:flex">
                <a href="/signup/" class="transition ease-in-out bg-indigo-200 hover:bg-indigo-400 py-2 px-4 rounded-lg font-bold">Register</a>
            </div>

            <!-- Version Mobile -->
            <div class="bg-slate-900/60 fixed top-16 right-0 left-0 bottom-0 pt-16 flex justify-center items-center flex-col gap-4 hidden">
                <a href="/singup/" class="transition ease-in-out bg-indigo-200 hover:bg-indigo-400 py-2 px-4 rounded-lg font-bold">Register</a>
            </div>  
        </div>
        `;
};

const createNavTodos = () => {
    navbar.innerHTML = `
            <div class="max-w-7xl mx-auto bg-indigo-400 h-16 flex items-center px-4 justify-between">
            <p class="font-bold text-xl text-white">Lista de Tareas</p>

            <!-- Version Mobile -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-indigo-800 rounded-lg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <!-- Version Desktop -->
            <div class="hidden md:flex">
                <button id="close-btn" class="transition ease-in-out bg-indigo-200 hover:bg-indigo-400 py-2 px-4 rounded-lg font-bold">Cerrar Sesión</button>
            </div>

            <!-- Version Mobile -->
            <div class="bg-slate-900/60 fixed top-16 right-0 left-0 bottom-0 pt-16 flex justify-center items-center flex-col gap-4 hidden">
                <button id="close-btn" class="transition ease-in-out bg-indigo-200 hover:bg-indigo-400 py-2 px-4 rounded-lg font-bold">Cerrar Sesión</button>   
            </div>  
        </div>
        `;
};

if (window.location.pathname === "/"){
    createNavHome();
} else if (window.location.pathname === "/signup/"){
    createNavSignup();
} else if (window.location.pathname === "/login/"){
    createNavLogin();
} else if (window.location.pathname === "/todos/"){
    createNavTodos();
}

const navBtn = navbar.children[0].children[1];

navBtn.addEventListener("click", e =>{
    const menuMobile = navbar.children[0].children[3];
    if (!navBtn.classList.contains("active")){ 
        navBtn.classList.add("active", "true")
        navBtn.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />`;
        menuMobile.classList.remove("hidden");
        menuMobile.classList.add("flex");   
    }else{
        navBtn.classList.remove("active")
        navBtn.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />`;
        menuMobile.classList.add("hidden");
        menuMobile.classList.remove("flex");   
}});

const closeBtnDesktop = navbar.children[0].children[2].children[0];
const closeBtnMobile = navbar.children[0].children[3].children[0];

closeBtnDesktop.addEventListener("click", async e =>{
    console.log("hola")
    try{
        await axios.get("/api/logout");
        window.location.pathname === "/login";
    }catch (error){
        console.log(error)
    };
});
