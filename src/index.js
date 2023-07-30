import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_lUgpZbgC3NGGA3aWJrXy0vUJgWER9dLhz7duFnCnXJso88wePXI8yHUKVnA2IYIB";

const selectEl = document.querySelector(".breed-select");
const loaderEl = document.querySelector(".loader");
const errorEl = document.querySelector(".error");
const catInfoEl = document.querySelector(".cat-info");

errorEl.style.display = 'none';
selectEl.style.display = 'none';

fetchBreeds().then((data) => {

    console.log(data);
    selectEl.style.display = 'block';
    //я не зрозумів як його коректно використати
    // const select = new SlimSelect({
    //     select: '#selectElement'
    //     },
    //     selectEl.value = createMarkupSelect(data),
    //     selectEl.insertAdjacentHTML('beforeend', createMarkupSelect(data))
    // )
    
    
    selectEl.value = createMarkupSelect(data);
    selectEl.insertAdjacentHTML('beforeend', createMarkupSelect(data));
}).catch((error) => {
    console.log(error);
    catInfoEl.style.display = 'none';
    // errorEl.style.display = 'block';
     Report.failure(
            'Oops!',
            'Something went wrong! Try reloading the page!',
            'Okay',
    );

}).finally(() => loaderEl.style.display = 'none');

//Функція, яка заповнює select опціями
function createMarkupSelect(arrOfCats) {
  return arrOfCats
    .map(
      ({ id, name }) => `
    <option value="${id}">
    ${name}
    </option>
    `
    )
    .join('');
}

//////////////////////

function handleSelectChange(event) {
    catInfoEl.style.display = 'none'
    loaderEl.style.display = 'unset'
    fetchCatByBreed(event.target.value).then((data) => {
        console.log(data, "ЦЕ ДАТА")
        catInfoEl.style.display = 'flex'
        catInfoEl.style.gap = '20px'


        const { url } = data[0];
        const { name, description, temperament } = data[0].breeds[0];
        catInfoEl.innerHTML = `
        
            <img src='${url}' alt='${name}' width=600 height=400/>
        <div class="container">
            <h2>${name}</h2>
            <p>${description}</p>
            <p><b>Temperament: </b>${temperament}</p>
        </div>
    `;

        
        // console.log("ЦЕ ДАТА")
    }).catch((error) => {
        console.log(error);
        // errorEl.style.display = 'block'
        Report.failure(
            'Oops!',
            '"Something went wrong!" <br/><br/>Try reloading the page!',
            'Okay',
        );
        
        selectEl.style.display = 'none'
        // console.log('ЦЕ ПОМИЛКА')
    }).finally(() => loaderEl.style.display = 'none');
    console.log("Я ЗМІНИВ ВИБІР В СЕЛЕКТІ");
    console.log(event.target.value, ' Це event.target.value')
}

selectEl.addEventListener('change', handleSelectChange);






