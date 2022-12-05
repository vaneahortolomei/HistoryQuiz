import '/src/style/index.scss'
import {moveToNextStep, isAuthUser} from './src/js/view';


moveToNextStep();

window.addEventListener('load', () => {
    isAuthUser();
})

