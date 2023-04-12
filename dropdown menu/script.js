const menuItems = document.querySelectorAll('.menu__item');
const subMenuItem = document.querySelector('.menu__sub');
let activeMenu = menuItems[0];

function hideSubMenu() {
    subMenuItem.style.display = 'none';
}

function showSubMenu() {
    subMenuItem.style.display = 'flex';
}

menuItems.forEach(menuItem => {
    menuItem.addEventListener('mouseenter', e => {
        const menu = e.target.innerText.toLowerCase();
        getSubmenu(menu)
            .then(submenu => {
                activeMenu.classList.remove('menu__item--active');
                if (!submenu) {
                    alert('A pretty weird error has occured')
                }
                else {
                    showSubMenu();
                    menuItem.classList.add('menu__item--active');
                    activeMenu = menuItem;
                    subMenuItem.innerHTML = mapSubMenuToHTML(submenu);
                }
            });
    });
})

subMenuItem.addEventListener('mouseleave', e => {
    hideSubMenu();
})

function getSubmenu(menu) {
    return fetch('assets/menu.json')
        .then(data => data.json())
        .then(data => {
            return data[menu];
        });
}

function getSubCategoryItemsHTML(itemsArray) {
    const mappedItems = itemsArray.map(item => {
        return `
            <li class="menu__sub__categories__item">
                <a href="${item.link}" class="menu__sub__categories__item__link">
                    ${item.text}
                </a>
            </li>
        `;
    })
    
    return `
        <ul class="menu__sub__categories__items">
            ${mappedItems.join(' ', mappedItems)}
        </ul>
    `;
}

function mapSubMenuToHTML(submenu) {
    const html = `
        <div class="menu__sub__categories">
            <div class="menu__sub__categories__top menu__sub__categories__category">
                <h3 class="menu__sub__categories__header">
                    ${submenu.firstColumn.label}
                </h3>
                ${getSubCategoryItemsHTML(submenu.firstColumn.items)}
            </div>
            <div class="menu__sub__categories__additional menu__sub__categories__category">
                <h3 class="menu__sub__categories__header">
                    ${submenu.secondColumn.label}
                </h3>
                ${getSubCategoryItemsHTML(submenu.secondColumn.items)}
            </div>
        </div>
        <div class="menu__sub__visual">
            <img class="menu__sub__visual__img" src="${submenu.image}" />
        </div>
    `;
    return html;
}