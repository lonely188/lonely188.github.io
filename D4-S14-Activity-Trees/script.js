const gallery = document.querySelector('.gallery');
const fadeLeft = document.querySelector('.fade-left');
const fadeRight = document.querySelector('.fade-right');

const scrollBtn = document.getElementById('scrollBtn');
const tabBtn = document.getElementById('tabBtn');

const galleryWrapper = document.querySelector('.gallery-wrapper');
const scrollInstructions = document.getElementById('scrollInstructions');
const tabView = document.querySelector('.tab-view');

const tabImage = document.getElementById('tabImage');
const tabs = document.querySelectorAll('.tab');

/* mode option */
function setMode(mode){

    if(mode === "scroll"){
        galleryWrapper.classList.remove("hidden");
        tabView.classList.add("hidden");

        scrollInstructions.style.display = "block";

        scrollBtn.classList.add("active");
        tabBtn.classList.remove("active");
    }

    if(mode === "tab"){
        galleryWrapper.classList.add("hidden");
        tabView.classList.remove("hidden");

        scrollInstructions.style.display = "none";

        tabBtn.classList.add("active");
        scrollBtn.classList.remove("active");
    }
}

/* toggle buttons */
scrollBtn.addEventListener('click', () => setMode("scroll"));
tabBtn.addEventListener('click', () => setMode("tab"));

/* fade logic */
function updateFades(){
    const scrollLeft = gallery.scrollLeft;
    const maxScroll = gallery.scrollWidth - gallery.clientWidth;

    fadeLeft.style.opacity = scrollLeft <= 5 ? "0" : "1";
    fadeRight.style.opacity = scrollLeft >= maxScroll - 5 ? "0" : "1";
}

/* scroll behavior */
gallery.addEventListener('wheel', (e) => {
    e.preventDefault();
    gallery.scrollLeft += e.deltaY * 4;
}, { passive:false });

gallery.addEventListener('scroll', updateFades);
window.addEventListener('load', updateFades);
window.addEventListener('resize', updateFades);

/* tab switching */
tabs.forEach(tab => {
    tab.addEventListener('click', () => {

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        tabImage.src = tab.dataset.img;
    });
});

/* copy loot filter */
function copyLootFilter(){

    const filterString = "Ch4KDUNvZGV4IFVwZ3JhZGUQAh3oIt//IgQIAzABKAEKMAoRUmFyZSBDaGFybXMvU2VhbHMQAB0AAP//IgwIBRUF7SIAFYB+IwAiBAgBIEQoAQomCg1HcmVhdGVyIEFmZml4EAIdAAD//yIGCAQgATABIgQIASAGKAEKIgoRQ29tbW9uL01hZ2ljL1JhcmUQAx0AAP//IgQIASAHKAESDEJhc2ljIEx2bCA3MBgCIAI=";

    navigator.clipboard.writeText(filterString);

    const msg = document.getElementById("copyMessage");

    msg.textContent = "Copied!";

    setTimeout(() => {
        msg.textContent = "";
    },2000);
}