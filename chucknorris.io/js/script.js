﻿'use strict';

let sideNav = document.querySelector('.side-nav__list');
let rdmJokeBtn = document.querySelector('#rdmJokeBtn');
let jokeDesc = document.querySelector('#jokeDesc');
let showMoreBtn = document.querySelector('#showMoreBtn');

let currentCategory;
let categories;
let hiddenCategories = [];

getCategories();




rdmJokeBtn.addEventListener('click', function(evt) {
  evt.preventDefault();

  let xhr = new XMLHttpRequest(); // Создаю xmlhttp запрос
  if (!currentCategory) {
    xhr.open('GET', 'https://api.chucknorris.io/jokes/random', true);
  } else {
    let categoryText = currentCategory.querySelector('button').innerHTML;
    let urlCategory = 'https://api.chucknorris.io/jokes/random?category=' + categoryText;
    xhr.open('GET', urlCategory, true);
  }

  xhr.send();

  xhr.onreadystatechange = function() {
  if (this.readyState != 4) return;

  if (this.status != 200) { // Если запрос не удался
    alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
    return;
  }

  let randJoke = JSON.parse(this.responseText).value; // Получил строку рандомной шутки
  randJoke = '"' + randJoke + '"'; // Добавил кавычки
  jokeDesc.innerHTML = randJoke;
  }
});

showMoreBtn.addEventListener('click', function(evt) {
  if (hiddenCategories.length === 0) {
    return;
  }

  if (!showMoreBtn.classList.contains('side-nav__show-more--opened')) {

  hiddenCategories.forEach(function(elem) {
    elem.classList.remove('side-nav__item--hidden');
  });


  showMoreBtn.classList.add('side-nav__show-more--opened');
  showMoreBtn.innerHTML = 'close';
  } else {
    hiddenCategories.forEach(function(elem) {
      elem.classList.add('side-nav__item--hidden');
    });

    showMoreBtn.classList.remove('side-nav__show-more--opened');
    showMoreBtn.innerHTML = 'more';
  }
});

function getCategories() {
  let xhr = new XMLHttpRequest(); // Создаю xmlhttp запрос
  xhr.open('GET', 'https://api.chucknorris.io/jokes/categories', true);
  xhr.send();

  xhr.onreadystatechange = function() {
    if (this.readyState != 4) return;

    if (this.status != 200) { // Если запрос не удался
      alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
      return;
    }

    categories = JSON.parse(this.responseText); // Получаем массив категорий
    fillCategories(); // Заполняем страницу категориями
  }
}

function fillCategories() {
  for (let i = 0; i < categories.length; i++) {
    let sideNavItem = document.createElement('li');
    sideNavItem.classList.add('side-nav__item');

    if (i > 9) {
      sideNavItem.classList.add('side-nav__item--hidden');
      hiddenCategories.push(sideNavItem);
    }

    let sideNavBtn = document.createElement('button');
    sideNavBtn.innerHTML = categories[i];

    sideNavItem.appendChild(sideNavBtn);

    sideNavBtn.addEventListener('click', function(evt) {
      let xhr = new XMLHttpRequest(); // Создаю xmlhttp запрос
      let categoryText = sideNavBtn.innerHTML;
      let urlCategory = 'https://api.chucknorris.io/jokes/random?category=' + categoryText;
      xhr.open('GET', urlCategory, true);
      xhr.send();

      xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;

      if (this.status != 200) { // Если запрос не удался
        alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
        return;
      }

      if (currentCategory) {
        currentCategory.classList.remove('side-nav__item--current');
      }

      sideNavItem.classList.add('side-nav__item--current');
      currentCategory = sideNavItem;

      let joke = JSON.parse(this.responseText).value; // Получаем шутку
      joke = '"' + joke + '"'; // Добавил кавычки
      jokeDesc.innerHTML = joke;
      }
    });

    sideNav.appendChild(sideNavItem);
  }
}
