import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_lUgpZbgC3NGGA3aWJrXy0vUJgWER9dLhz7duFnCnXJso88wePXI8yHUKVnA2IYIB";


const BASE_URL = ' https://api.thecatapi.com/v1';
// const MY_KEY = 'live_lUgpZbgC3NGGA3aWJrXy0vUJgWER9dLhz7duFnCnXJso88wePXI8yHUKVnA2IYIB';


export function fetchBreeds() {
    // console.log("ghhgh");

    // return fetch(`${BASE_URL}/breeds`,{headers: {
    //   'x-api-key':MY_KEY
    //     }}).then((response) => {
    //     if (!response.ok) {
    //         throw new Error(response.status);
    //     }
    //     // console.log(response.json());
    //     return response.json();
    // })

    return axios
        .get(`${BASE_URL}/breeds`)
        .then(resp => {
            return resp.data;
        });
}


export function fetchCatByBreed(breedId) {
    // return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, {
    //     headers: {
    //     'x-api-key': MY_KEY
    // }}).then((response) => {
    //     if (!response.ok) {
    //         throw new Error(response.status);
    //     }
    //     // console.log(response.json());
    //     return response.json();
    // })

    return axios
        .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
        .then(resp => {
            return resp.data;
        });
}