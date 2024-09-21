
let dataPanes = [];
let dataPills = [];

fetch('../data/Data.json')
    .then(response => response.json())
    .then(data => {
        dataPanes = data.tabPanes;
        console.log("🚀 [ data:", dataPanes)
        dataPills = data.navPills;
        console.log("🚀 [ dataPills:", dataPills)

    })
    .catch(error => console.error('Error loading JSON:', error));

document.querySelectorAll('.nav-link').forEach(tab => {
    tab.addEventListener('click', function (event) {
        event.preventDefault();
        const type = this.getAttribute('href').substring(1);
        renderItems(type);

        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        this.classList.add('active');

        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        document.getElementById(type).classList.add('active');
    });
});

let renderItems = (type) => {
    const container = document.getElementById(`${type}_container`);
    container.innerHTML = '';

    const filteredItems = dataPanes.filter(item => item.type === type);
    console.log("🚀 [ renderItems [ filteredItems:", filteredItems)

    filteredItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'col-2 col-md-2 item mb-3';

        itemDiv.innerHTML = `
                <div class="card">
                    <img src="${item.imgSrc_jpg}" class="card-img-top" alt="${item.name}">
                    <div class="card-body text-center">
                        <button class="btn btn-primary try-on-btn">Thử đồ</button>
                    </div>
                </div>
            `;

        const button = itemDiv.querySelector('.try-on-btn');
        button.addEventListener('click', () => {
            console.log("🚀 [ Try On ] Item Info:", item);
            putOn(item)
        });
        container.appendChild(itemDiv);
    });
}
// Render mặc định cho tab đầu tiên
renderItems('topclothes');

function putOn(item) {
    let itemPosition = document.querySelector(`div.put_on[type="${item.type}"]`);
    itemPosition.innerHTML = `<img src="${item.imgSrc_png}" style="width:100%">
    `
}