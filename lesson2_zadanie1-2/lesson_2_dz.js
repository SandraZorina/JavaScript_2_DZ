function Container(){
  this.id = ""; 
  this.className = "";
  this.htmlCode = "";
}

Container.prototype.render = function(){
   return this.htmlCode; 
}

Container.prototype.remove = function(){
   document.getElementById(this.id).remove();
}

function Menu(my_id, my_class, my_items){
   Container.call(this); 
   this.id = my_id; 
   this.className = my_class;
   this.items = my_items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function(){
  
  var result = "<ul class='"+this.className+"' id='"+this.id+"'>";
  
  for(var item in this.items){
    if(this.items[item] instanceof MenuItem){ 
      result += this.items[item].render();
    }
  }
  
  result += "</ul>";
  return result;
}

function SubMenu(my_id, my_class, my_items){
   Container.call(this);
   this.id = my_id;
   this.className = my_class;
   this.href = my_href;
   this.items = my_items;
}

SubMenu.prototype = Object.create(Menu.prototype);
SubMenu.prototype.constructor = SubMenu;

SubMenu.prototype.render = function(){
  var result = "<ul class='"+this.className+"' id='"+this.id+"'>";
  
  for(var item in this.items){
    if(this.items[item] instanceof MenuItem){ 
      result += this.items[item].render();
    }else{
      var array = this.items[item]; 
      result += "<ul>";
      for (elem in array){
        result += array[elem].render();
      }
      result += "</ul>";
    }
  }
  
  result += "</ul>";
  
  return result;
}

function MenuItem(my_href, my_name,my_id){
   Container.call(this);
   this.className = "menu-item";
   this.id = my_id;
   this.href = my_href;
   this.itemName = my_name;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;


MenuItem.prototype.render = function(){
  return "<li class='"+this.className+"' href='"+ this.href +"' id='"+ this.id +"'>" + this.itemName + "</li>";
}

var my_items;
function fullMenuContent(xhr){
  my_items ={}

  if(xhr.readyState == 4){  
    if(xhr.status == 0){     
        var items = JSON.parse(xhr.responseText); 
        for (var i=0; i< items.menu_items.length;i++) {
            if(items.menu_items[i] instanceof Array){
                var temp_arr = [];
                items.menu_items[i].forEach(function(item, i, arr){
                    temp_arr.push(new MenuItem(item.href, item.title));
                });
                my_items[i] = temp_arr;
            } else {
               my_items[i] = new MenuItem(items.menu_items[i].href, items.menu_items[i].title);
        }
        var menu = new Menu("my_menu", "My_class", my_items);
        var div = document.write(menu.render());
    }
  }
}

var menu = new SubMenu("my_menu", "My_class", my_items);
var div = document.write(menu.render());

var xhr = false;
if (window.XMLHttpRequest){ 
  xhr = new XMLHttpRequest(); 
} else if(window.ActiveXObject){ 
  try{
    xhr = new ActiveXObject('Msxml2.XMLHTTP'); 
  } catch(e){
    try{
      xhr = new ActiveXObject('Microsoft.XMLHTTP'); 
    }catch(e){}
  }
}

if (!xhr){
  alert("Ошибка: невозможно создать");
}

xhr.onreadystatechange = function (){fullMenuContent(xhr)}; 
xhr.open('GET', "./menu.json", true);
xhr.send(); 