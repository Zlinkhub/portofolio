// Toggle menu mobile
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');
toggle.addEventListener('click', () => {
    nav.classList.toggle('show');
});

// Helper hex to rgb
function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#',''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
}

// Load setting dari localStorage
window.addEventListener('load', () => {
    const heroText = localStorage.getItem('hero-title') || 'Selamat Datang';
    const heroSub = localStorage.getItem('hero-subtitle') || 'Ini portfolio saya';
    const bgUrl = localStorage.getItem('bg-url') || 'images/bg.jpg';
    const grad1 = localStorage.getItem('grad1') || '#0000ff';
    const grad2 = localStorage.getItem('grad2') || '#ff00ff';
    const opacity = localStorage.getItem('opacity') || 0.5;

    document.getElementById('hero-text').innerText = heroText;
    document.getElementById('hero-subtext').innerText = heroSub;
    document.querySelector('.hero').style.background = `linear-gradient(rgba(${hexToRgb(grad1)},${opacity}), rgba(${hexToRgb(grad2)},${opacity})), url('${bgUrl}')`;

    document.getElementById('hero-title').value = heroText;
    document.getElementById('hero-subtitle').value = heroSub;
    document.getElementById('bg-url').value = bgUrl;
    document.getElementById('grad1').value = grad1;
    document.getElementById('grad2').value = grad2;
    document.getElementById('opacity').value = opacity;
});

// Save setting
document.getElementById('save-settings').addEventListener('click', () => {
    const heroText = document.getElementById('hero-title').value;
    const heroSub = document.getElementById('hero-subtitle').value;
    const bgUrl = document.getElementById('bg-url').value;
    const grad1 = document.getElementById('grad1').value;
    const grad2 = document.getElementById('grad2').value;
    const opacity = document.getElementById('opacity').value;

    localStorage.setItem('hero-title', heroText);
    localStorage.setItem('hero-subtitle', heroSub);
    localStorage.setItem('bg-url', bgUrl);
    localStorage.setItem('grad1', grad1);
    localStorage.setItem('grad2', grad2);
    localStorage.setItem('opacity', opacity);

    // Apply immediately
    document.getElementById('hero-text').innerText = heroText;
    document.getElementById('hero-subtext').innerText = heroSub;
    document.querySelector('.hero').style.background = `linear-gradient(rgba(${hexToRgb(grad1)},${opacity}), rgba(${hexToRgb(grad2)},${opacity})), url('${bgUrl}')`;

    alert("Pengaturan berhasil disimpan!");
});

// Form pemesanan
document.getElementById('form-order').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form pemesanan berhasil dikirim!');
    e.target.reset();
});

// Theme color dari admin panel
const primaryInput = document.getElementById('primary-color');
primaryInput.addEventListener('change', () => {
    const color = primaryInput.value;
    document.documentElement.style.setProperty('--primary-color', color);
    localStorage.setItem('primary-color', color);
});

// Load theme color
const savedColor = localStorage.getItem('primary-color');
if(savedColor){
    document.documentElement.style.setProperty('--primary-color', savedColor);
    primaryInput.value = savedColor;
}

// Proyek (dari localStorage atau default)
let projects = JSON.parse(localStorage.getItem('projects')) || [
    {title:'Project 1', img:'images/project1.jpg', desc:'Deskripsi project 1', link:'#'},
    {title:'Project 2', img:'images/project2.jpg', desc:'Deskripsi project 2', link:'#'}
];

// Generate proyek di halaman
const projectGrid = document.getElementById('project-grid');
function renderProjects() {
    projectGrid.innerHTML = '';
    projects.forEach((p,i)=>{
        const div = document.createElement('div');
        div.className = 'project-card fade-in';
        div.innerHTML = `<h3>${p.title}</h3><img src="${p.img}" alt="${p.title}" style="max-width:100%;border-radius:5px;">`;
        div.addEventListener('click', () => openModal(p));
        projectGrid.appendChild(div);
    });
}
renderProjects();

// Modal
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalDesc = document.getElementById('modal-desc');
const modalLink = document.getElementById('modal-link');

function openModal(project){
    modalTitle.innerText = project.title;
    modalImg.src = project.img;
    modalDesc.innerText = project.desc;
    modalLink.href = project.link;
    modal.style.display='flex';
}

modal.querySelector('.close').addEventListener('click', ()=> modal.style.display='none');
window.addEventListener('click', e=>{if(e.target===modal) modal.style.display='none'});

// Animasi scroll fade-in
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
    });
}, {threshold:0.1});
faders.forEach(f=>observer.observe(f));