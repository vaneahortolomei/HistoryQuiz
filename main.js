import '/src/style/index.scss'
import {moveToNextStep, isAuthUser, createLoader} from './src/js/view';


moveToNextStep();
createLoader();
window.addEventListener('load', () => {
    isAuthUser();
})

