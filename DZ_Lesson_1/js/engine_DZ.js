function Container() {
    this.id = "";
    this.className = "";
    this.htmlCode = "123";
}

Container.prototype.render = function () {
    return this.htmlCode;
}

Container.prototype.remove = function () {
    return this.parentElem.removeChild(this);
}

function Menu(my_id, my_class, my_items, my_sub_menu) {
    Container.call(this);
    this.id = my_id;
    this.className = my_class;
    this.sub_menu_items = my_sub_menu;
    this.items = my_items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function () {
    var result = "<ul class='" + this.className + "' id='" + this.id + "'>";

    for (var item in this.items) {
        if (this.items[item] instanceof MenuItem) {
            result += this.items[item].render();
            result += "<ul>";
            for (var sub in this.sub_menu_items) {
                if (this.sub_menu_items[sub] instanceof SubMenuItem && this.sub_menu_items[sub].className == this.items[item].id) {
                    result += this.sub_menu_items[sub].render();
                }
            }
            result += "</ul>";
        }
    }

    result += "</ul>";
    return result;
}

function MenuItem(my_href, my_name) {
    Container.call(this);
    this.className = "menu-item";
    this.href = my_href;
    this.itemName = my_name;
    this.id = my_name;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function () {
    return "<li class='" + this.className + "' href='" + this.href + "' id='" + this.id + "'>" + this.itemName + "</li>";
}

function SubMenu(my_class, my_items) {
    Menu.call(this);
    this.className = my_class;
    this.items = my_items;
}

SubMenu.prototype = Object.create(Menu.prototype);
SubMenu.prototype.constructor = SubMenu;

SubMenu.prototype.render = function () {
    var result = "<ul class='" + this.className + "'>";

    for (var item in this.items) {
        if (this.items[item] instanceof SubMenuItem) {
            result += this.items[item].render();
        }
    }
    result += "</ul>";
}

function SubMenuItem(my_class, my_href, my_name) {
    Container.call(this);
    this.className = my_class;
    this.href = my_href;
    this.itemName = my_name;
    this.id = my_name;
}

SubMenuItem.prototype = Object.create(Container.prototype);
SubMenuItem.prototype.constructor = SubMenuItem;
SubMenuItem.prototype.render = function () {
    return "<li class='" + this.className + "' href='" + this.href + "' id='" + this.id + "'>" + this.itemName + "</li>";
}

var sub_m_item1 = new SubMenuItem("Каталог", "/Cat/unit1/", "Cat_unit1");
var sub_m_item2 = new SubMenuItem("Каталог", "/Cat/unit2/", "Cat_unit2");
var sub_m_item3 = new SubMenuItem("Галерея", "/Gal_unit1/", "Gal_unit1");
var sub_m_item4 = new SubMenuItem("Галерея", "/Gal_unit2/", "Gal_unit2");
var sub_m_items = {
    0: sub_m_item1,
    1: sub_m_item2,
    2: sub_m_item3,
    3: sub_m_item4
};

var m_item1 = new MenuItem("/", "Главная");
var m_item2 = new MenuItem("/catalogue/", "Каталог");
var m_item3 = new MenuItem("/gallery/", "Галерея");
var m_item4 = new MenuItem("/del/", "del");
var m_items = {
    0: m_item1,
    1: m_item2,
    2: m_item3,
    3: m_item4
};
var menu = new Menu("my_menu", "My_class", m_items, sub_m_items);



var div = document.write(menu.render());

var del = document.getElementById("del");
del.remove();

var del = document.getElementById("Gal_unit1");
del.remove();
