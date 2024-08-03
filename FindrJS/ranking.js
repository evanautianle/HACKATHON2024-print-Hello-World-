document.addEventListener('DOMContentLoaded', () => {
    const draggableList = document.getElementById('draggable-list');
    const rankingPlanets = [
        'Planet 1',
        'Planet 2',
        'Planet 3',
        'Planet 4',
        'Planet 5',
        'Planet 6'
    ];

    let dragStartIndex;

    function createList() {
        rankingPlanets.forEach((planet, index) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);
            listItem.classList.add('draggable-item');

            listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="planet-name">${planet}</p>
                <i class="fas fa-grip-lines grip-lines"></i>
            </div>
            `;

            draggableList.appendChild(listItem);
        });

        addEventListeners();
    }

    function addEventListeners() {
        const draggables = document.querySelectorAll('.draggable');
        const dragListItems = document.querySelectorAll('.draggable-list li');

        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', dragStartHandler);
            draggable.addEventListener('dragend', dragEndHandler);
        });

        dragListItems.forEach(item => {
            item.addEventListener('dragover', dragOverHandler);
            item.addEventListener('drop', dragDropHandler);
            item.addEventListener('dragenter', dragEnterHandler);
            item.addEventListener('dragleave', dragLeaveHandler);
        });
    }

    function dragStartHandler(event) {
        dragStartIndex = +event.target.closest('li').getAttribute('data-index');
        event.target.classList.add('dragging');
        event.dataTransfer.setData('text/plain', ''); // Required for Firefox
    }

    function dragEndHandler(event) {
        event.target.classList.remove('dragging');
    }

    function dragEnterHandler(event) {
        event.preventDefault();
        event.target.closest('li').classList.add('over');
    }

    function dragOverHandler(event) {
        event.preventDefault();
    }

    function dragLeaveHandler(event) {
        event.target.closest('li').classList.remove('over');
    }

    function dragDropHandler(event) {
        event.preventDefault();
        const dragEndIndex = +event.target.closest('li').getAttribute('data-index');
        swapItems(dragStartIndex, dragEndIndex);
        event.target.closest('li').classList.remove('over');
    }

    function swapItems(fromIndex, toIndex) {
        const items = [...document.querySelectorAll('.draggable-list li')];
        const item1 = items[fromIndex];
        const item2 = items[toIndex];

        // Swap the items in the DOM
        draggableList.insertBefore(item1, item2);
        draggableList.insertBefore(item2, items[fromIndex + (fromIndex < toIndex ? 1 : 0)]);
    }

    createList();
});
