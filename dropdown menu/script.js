const menuItems = document.querySelectorAll('.menu__item');
const subMenuItem = document.querySelector('.menu__sub');
let activeMenu = menuItems[0];

const hideSubMenu = () => {
  subMenuItem.style.display = 'none';
};

const showSubMenu = () => {
  subMenuItem.style.display = 'flex';
};

const getSubmenu = async (menu) => {
  const response = await fetch('assets/menu.json');
  const data = await response.json();
  return data[menu];
};

const getSubCategoryItemsHTML = (itemsArray) => {
  return `
    <ul class="menu__sub__categories__items">
      ${itemsArray.map(item => `
        <li class="menu__sub__categories__item">
          <a href="${item.link}" class="menu__sub__categories__item__link">
            ${item.text}
          </a>
        </li>
      `).join('')}
    </ul>
  `;
};

const mapSubMenuToHTML = (submenu) => {
  return `
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
};

const handleMenuItemMouseEnter = async (menuItem) => {
  const menu = menuItem.innerText.toLowerCase();
  const submenu = await getSubmenu(menu);

  activeMenu.classList.remove('menu__item--active');

  if (!submenu) {
    alert('A pretty weird error has occurred');
  } else {
    showSubMenu();
    menuItem.classList.add('menu__item--active');
    activeMenu = menuItem;
    subMenuItem.innerHTML = mapSubMenuToHTML(submenu);
  }
};

const handleSubMenuItemMouseLeave = () => {
  hideSubMenu();
};

menuItems.forEach(menuItem => {
  menuItem.addEventListener('mouseenter', () => {
    handleMenuItemMouseEnter(menuItem);
  });
});

subMenuItem.addEventListener('mouseleave', handleSubMenuItemMouseLeave);
