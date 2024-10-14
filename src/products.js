import borschtSoup from './assets/soups/borschtSoup.png';
import vegShrimpsSoup from './assets/soups/vegShrimpsSoup.png';
import tomYumSoup from './assets/soups/tomYumSoup.png';
import chickenSoup from './assets/soups/chickenSoup.png';
import mushroomSoup from './assets/soups/mushroomSoup.png';

import margheritaPizza from './assets/pizza/margheritaPizza.png';
import seafoodPizza from './assets/pizza/seafoodPizza.png';
import fourCheesePizza from './assets/pizza/fourCheesePizza.png';
import fourMeatPizza from './assets/pizza/fourMeatPizza.png';
import pepperoniPizza from './assets/pizza/pepperoniPizza.png';
import caesarPizza from './assets/pizza/caesarPizza.png';

import hamBurger from './assets/burgers/hamBurger.png';
import cheeseBurger from './assets/burgers/cheeseBurger.png';
import cheeseBaconBurger from './assets/burgers/cheeseBaconBurger.png';
import fishBurger from './assets/burgers/fishBurger.png';
import chickenBurger from './assets/burgers/chickenBurger.png';

import greekSalad from './assets/salads/greekSalad.png';
import caesarSalad from './assets/salads/caesarSalad.png';
import nicoiseSalad from './assets/salads/nicoiseSalad.png';
import capreseSalad from './assets/salads/capreseSalad.png';
import seafoodSalad from './assets/salads/seafoodSalad.png';

import bolognesePasta from './assets/pasta/bolognesePasta.png';
import carbonaraPasta from './assets/pasta/carbonaraPasta.png';
import fettuccinePasta from './assets/pasta/fettuccinePasta.png';
import seafoodPasta from './assets/pasta/seafoodPasta.png';
import lasagnaPasta from './assets/pasta/lasagnaPasta.png';
import pennePasta from './assets/pasta/pennePasta.png';

import nuggetsChicken from './assets/chicken/nuggetsChicken.png';
import wingsChicken from './assets/chicken/wingsChicken.png';
import stripsChicken from './assets/chicken/stripsChicken.png';

import mochiDessert from './assets/desserts/mochiDessert.png'
import cheesecakeDessert from './assets/desserts/cheesecakeDessert.png'
import strudelDessert from './assets/desserts/strudelDessert.png'
import napoleonDessert from './assets/desserts/napoleonDessert.png'
import tiramisuDessert from './assets/desserts/tiramisuDessert.png'
import cremeBruleeDessert from './assets/desserts/cremeBruleeDessert.png'

import pepsiDrink from './assets/drinks/pepsiDrink.png'
import appleJuiceDrink from './assets/drinks/appleJuiceDrink.png'
import orangeJuiceDrink from './assets/drinks/orangeJuiceDrink.png'
import teaDrink from './assets/drinks/teaDrink.png'
import cappucinoDrink from './assets/drinks/cappucinoDrink.png'
import filterDrink from './assets/drinks/filterDrink.png'
import espressoDrink from './assets/drinks/espressoDrink.png'
import waterDrink from './assets/drinks/waterDrink.png'

export const productsByCategory = {
    'Супи': [
        { name: 'Овочевий крем-суп з креветками', image: vegShrimpsSoup, price: 250 },
        { name: 'Грибна юшка', image: mushroomSoup, price: 130 },
        { name: 'Курячий бульйон', image: chickenSoup, price: 125 },
        { name: 'Том-ям', image: tomYumSoup, price: 359 },
        { name: 'Борщ', image: borschtSoup, price: 145 }
    ],
    'Піца': [
        { name: 'Маргарита', image: margheritaPizza, price: 150 },
        { name: 'Піца з морепродуктами', image: seafoodPizza, price: 375 },
        { name: 'Чотири сири', image: fourCheesePizza, price: 250 },
        { name: 'Чотири м\'яса', image: fourMeatPizza, price: 180 },
        { name: 'Пепероні', image: pepperoniPizza, price: 160 },
        { name: 'Піца цезар', image: caesarPizza, price: 215 }
    ],
    'Бургери': [
        { name: 'Гамбургер', image: hamBurger, price: 120 },
        { name: 'Чизбургер', image: cheeseBurger, price: 150 },
        { name: 'Фішбургер', image: fishBurger, price: 170 },
        { name: 'Чікенбургер', image: chickenBurger, price: 155 },
        { name: 'Чизбургер з беконом', image: cheeseBaconBurger, price: 175 },
    ],
    'Салати': [
        { name: 'Цезар', image: caesarSalad, price: 220 },
        { name: 'Грецький', image: greekSalad, price: 80 },
        { name: 'Капрезе', image: capreseSalad, price: 120 },
        { name: 'Нісуаз', image: nicoiseSalad, price: 175 },
        { name: 'Салат з морепродуктами', image: seafoodSalad, price: 250 },
    ],
    'Паста': [
        { name: 'Болоньєзе', image: bolognesePasta, price: 160 },
        { name: 'Карбонара', image: carbonaraPasta, price: 140 },
        { name: 'Феттучіні', image: fettuccinePasta, price: 180 },
        { name: 'Паста з морепродуктами', image: seafoodPasta, price: 210 },
        { name: 'Лазанья', image: lasagnaPasta, price: 250 },
        { name: 'Паста пенне з печеними томатами', image: pennePasta, price: 150 },
    ],
    'Курка': [
        { name: 'Нагетси', image: nuggetsChicken, price: 80 },
        { name: 'Крильця BBQ', image: wingsChicken, price: 110 },
        { name: 'Стріпси', image: stripsChicken, price: 120 },
    ],
    'Десерти': [
        { name: 'Моті', image: mochiDessert, price: 50 },
        { name: 'Чизкейк', image: cheesecakeDessert, price: 70 },
        { name: 'Штрудель', image: strudelDessert, price: 65 },
        { name: 'Наполеон', image: napoleonDessert, price: 95 },
        { name: 'Тирамісу', image: tiramisuDessert, price: 70 },
        { name: 'Крем-брюле', image: cremeBruleeDessert, price: 115 }
    ],
    'Напої': [
        { name: 'Pepsi', image: pepsiDrink, price: 50 },
        { name: 'Сік яблучний', image: appleJuiceDrink, price: 60 },
        { name: 'Сік апельсиновий', image: orangeJuiceDrink, price: 60 },
        { name: 'Вода', image: waterDrink, price: 25 },
        { name: 'Чай', image: teaDrink, price: 55 },
        { name: 'Капучино', image: cappucinoDrink, price: 60 },
        { name: 'Фільтр', image: filterDrink, price: 40 },
        { name: 'Еспресо', image: espressoDrink, price: 35 },
    ],
};
