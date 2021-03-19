/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    let adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]'),
        delFilm = document.querySelectorAll('.delete');

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0,22)}...`
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            createMovieList(movieDB.movies, movieList);
            if (favorite) {
                console.log('Добавлен любимый фильм')
                checkbox.checked = false;
            }
        }

        event.target.reset();
    })

    const deleteAdv = (arr) => {
        arr.forEach(elem => {
            elem.remove();
        });
    }

    let changeItems = () => {
        genre.innerHTML = 'драма';
    }

    let sortArr = (arr) => {
        arr.sort();
    }

    function createMovieList(films, parent) {
        parent.innerHTML = '';
        sortArr(films)
        films.forEach((index, i) => {
            parent.innerHTML += `
        <li class="promo__interactive-item">${i + 1} ${index}
            <div class="delete"></div>
        </li>
    `
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
                btn.addEventListener('click', () => {
                    btn.parentElement.remove();
                    movieDB.movies.splice(i, 1);

                    createMovieList(movieDB.movies, movieList);
                })
            })

    }
    deleteAdv(adv);

    changeItems();

    createMovieList(movieDB.movies, movieList);

});














