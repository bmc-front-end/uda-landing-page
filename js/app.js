/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 **/

/**
 * Define Global Variables
 *
 **/
let menu = document.querySelector("#navbar__list");

let menu_class = "menu__link";

let menuItemSelectedLast;

let sectionActiveLast;

let activeClassName = "your-active-class";

let activeMenuName = "menu_active";

let sectionItems = document.querySelectorAll("section[data-nav]");

/**
 * End Global Variables
 * Start Helper Functions
 *
 **/

/**
 * @description scrollToTarget - Scrolls into section view
 * @constructor
 * @param {element node} el - element node referenced by ID
 */
let scrollToTarget = (el) => {
  el.scrollIntoView({ behavior: "smooth" });
};

/**
 * @description removeClass - Remove a class from node
 * @constructor
 * @param {element node} classTarget - element node reference
 * @param {string} className - name of class to be removed
 */
let removeClass = (classTarget, className) => {
  if (classTarget != undefined) classTarget.classList.remove(className);
};

/**
 * @description addClass - applies class to node
 * @constructor
 * @param {element node} classTarget - element node reference
 * @param {string} className - name of class to be added
 */
let addClass = (classTarget, className) => {
  if (classTarget != undefined) classTarget.classList.add(className);
};

/**
 * @description toggleMenuItem - activate or deactivate class on node
 * @constructor
 * @param {element node} menuItem - element node reference
 * @param {string} className - name of class to be activated / deactivated
 */
let toggleMenuItem = (menuItem, className) => {
  if (menuItem != undefined) menuItem.classList.toggle(className);
};

/**
 * @description getTarget - returns node search by id on document
 * @constructor
 * @param {string} idName - name of id to be searched for
 */
let getTarget = (idName) => {
  return document.getElementById(idName);
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 **/

let buildMenu = () => {
  let fragment = new DocumentFragment();

  sectionItems.forEach(function (menuItem) {
    let li = document.createElement("li");
    //    li.innerHTML = `<a href="#${menuItem.getAttribute("id")}" class="${menu_class}"> ${menuItem.getAttribute("data-nav")}</a>`;
    li.innerHTML = `<a href="#" class="${menu_class}"> ${menuItem.getAttribute("data-nav")}</a>`;
    fragment.appendChild(li);
  });

  menu.appendChild(fragment);
};

/**
 * @description initializeMenu - highlight menu item 1
 * @constructor
 * @param {node reference} t - menu node to be targeted
 */
let initializeMenu = (t) => {
  toggleMenuItem(t, activeMenuName);
  menuItemSelectedLast = t;
};

/**
 * @description trackPosition - Add class 'active' calss to section when near top of viewport
 * @constructor
 * @param {default object} event - obj provided by eventlistener
 */
let trackPosition = (event) => {
  let targetHREF = "";

  for (const section of sectionItems) {
    let rect = section.getBoundingClientRect();

    if (rect.top <= 100 && rect.bottom >= 100) {
      if (!(section.classList.contains(activeClassName) && sectionActiveLast == undefined)) {
        removeClass(sectionActiveLast, activeClassName);
        addClass(section, activeClassName);
      }

      sectionActiveLast = section;

      break;
      event.stopPropagation();
    } // end if
  } // end for
}; // end function

/**
 * @description updateMenu - update menu by highlighting relevant menu items
 * @constructor
 * @param {default object} event - obj provided by eventlistener
 */
let updateMenu = (e) => {
  let t = e.target;
  let destinationID = "";
  e.preventDefault();

  toggleMenuItem(menuItemSelectedLast, activeMenuName);
  toggleMenuItem(t, activeMenuName);

  menuItemSelectedLast = t;

  for (var i = 0; i < menu.children.length; ++i) {
    if (menu.children[i].firstElementChild === t) {
      scrollToTarget(sectionItems[i]);
      e.stopPropagation();
    }
  }
};

/**
 * End Main Functions
 * Begin Events
 *
 **/
// Build menu
buildMenu();

// Activate first menu item
initializeMenu(menu.querySelector(".menu__link"), activeMenuName);

/**
 * @description listen to event to Scroll to section on link click
 * @param {function} function to be fired
 */
menu.addEventListener("click", updateMenu);

/**
 * @description listen to event to Scroll to section on link click
 * @param {function} function to be fired
 */
document.addEventListener("scroll", trackPosition);
