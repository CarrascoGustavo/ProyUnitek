const members = document.querySelectorAll('.member');

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

// Initialize with URL parameter if present
const urlParams = new URLSearchParams(window.location.search);
let Servicios = parseInt(urlParams.get('service')) || 0;

// Validate index
if (Servicios < 0 || Servicios >= members.length) {
	Servicios = 0;
}

function update() {
	members.forEach(m => m.classList.remove("active", "prev", "next"));
	const total = members.length;
	let prevIndex = (Servicios - 1 + total) % total;
	let nextIndex = (Servicios + 1) % total;
	members[Servicios].classList.add("active");
	members[prevIndex].classList.add("prev");
	members[nextIndex].classList.add("next");
}

prev.onclick = () => {
	Servicios = (Servicios - 1 + members.length) % members.length;
	update();
}

next.onclick = () => {
	Servicios = (Servicios + 1) % members.length;
	update();
}

update();
