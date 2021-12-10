import App from './components/App';
import "./style.css"

function start(){
    const rootEl = document.querySelector('#root');
    if(rootEl){
        const app = new App(rootEl);
        app.render();
    }
}

start();