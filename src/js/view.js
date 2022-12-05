const controller = {
    isAuth: false,
}

const offsetW = document.querySelector('.quiz-game'),
    box = document.querySelector('.quiz-game__container'),
    group = document.querySelector('.form__group'),
    input = document.querySelector('.form__input');


const setUserToStorage = () => {
    return window.localStorage.setItem('user', input.value);
}

const getUserFromStorage = () => {
    return window.localStorage.getItem('user');
}

const createError = () => {
    const error = document.createElement('span');
    error.className = 'form__error';
    error.textContent = 'Field is empty!'
    group.append(error)
}

const checkInput = () => {
    return input.value === '';
}

const showUserName = () => {
    const user = document.querySelector('.quiz-header__name');
    user.innerText = getUserFromStorage();
}

export const isAuthUser = () => {
    if (getUserFromStorage()) {
        showUserName();
        box.style.transform = `translate(-${offsetW.offsetWidth}px, 0)`;
    }
}

export const moveToNextStep = () => {
    const nextBtn = document.querySelector('#next-btn');

    nextBtn.addEventListener('click', () => {
        if (checkInput()) {
            return createError();

        } else {
            box.style.transform = `translate(-${offsetW.offsetWidth}px, 0)`;
            box.classList.add('quiz-game__container--transition')
            setUserToStorage();
            showUserName();
        }
    });
}