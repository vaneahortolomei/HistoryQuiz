import array from '/src/js/answers.json';

const quiz = array.answers;

let count = 1;

const offsetW = document.querySelector('.quiz-game'),
    box = document.querySelector('.quiz-game__container'),
    form = document.querySelector('.quiz-game__form'),
    nextBtn = document.querySelector('.quiz-game__btn'),
    input = document.querySelector('.form__input');

const c = document.querySelector('.quiz-question__count'),
    t = document.querySelector('.quiz-question__text'),
    l = document.querySelector('.quiz-answers');


const setUserToStorage = () => {
    return window.localStorage.setItem('user', input.value);
}

const getUserFromStorage = () => {
    return window.localStorage.getItem('user');
}

const checkInput = () => {
    return input.value === '';
}

const showUserName = () => {
    const user = document.querySelector('.quiz-header__name');
    user.innerText = getUserFromStorage();
}

export const createLoader = () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.textContent = 'Loading...';
    box.append(loader);

    setTimeout(() => {
        loader.remove();
    }, 1000)
}

const renderSecondStep = () => {
    const n = count++;


    if (n > quiz.length) {
        box.innerHTML = `<div class="quiz-finish">
            <p>Finish!</p>
            <button id="btn-reload" type="button" class="button button--green button--responsive">ReloadGame</button>
        </div>`


        const btn = document.querySelector('#btn-reload');
        btn.addEventListener('click', () => {
            window.location.reload();
        })

    }


    [...quiz].map(item => {
        let inner = '';

        if (item.id === n) {
            c.innerText = `${n}/${quiz.length}`;
            t.innerText = `${item.text}`;

            item.answers.map(item => {
                inner += `
                <li class="quiz-answers__item">
                    <button type="button" data-btn="${item.boolean}"
                            class="button button--white button--responsive quiz-answers__button">${item.name}
                    </button>
                </li>`
            });


            l.innerHTML = inner;

            const b = l.querySelectorAll('.quiz-answers__button');
            [...b].forEach((btn, index, arr) => {
                const data = btn.dataset.btn;

                btn.addEventListener('click', e => {

                    if (data === 'true') {
                        btn.classList.add('button--green');

                    } else {
                        btn.classList.add('button--red');
                    }

                    [...arr].forEach(item => {
                        item.setAttribute('disabled', true)
                    });

                    nextBtn.removeAttribute('disabled');
                });
            })
        }
    })
}

renderSecondStep();

nextBtn.addEventListener('click', () => {
    nextBtn.setAttribute('disabled', true);
    renderSecondStep();
});


export const isAuthUser = () => {
    if (getUserFromStorage()) {
        showUserName();
        form.remove();
    }
}

export const moveToNextStep = () => {
    const nextBtn = document.querySelector('#next-btn');

    nextBtn.addEventListener('click', () => {
        if (checkInput()) {
            const error = document.querySelector('.form__error');
            error.classList.add('form__error--show');

        } else {
            box.style.transform = `translate(-${offsetW.offsetWidth}px, 0)`;
            box.classList.add('quiz-game__container--transition')
            setUserToStorage();
            showUserName();
        }
    });
}

