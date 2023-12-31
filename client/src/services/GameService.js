import * as request from "../lib/request.js";

//gameData === names

const baseUrl = 'http://localhost:3030/data/games';

//all games - add new folder lib
export const getAll = async () => {
    const result = await request.get(baseUrl);

    return Object.values(result);
};

export const getOne = async (gameId) => {
    const result = await request.get(`${baseUrl}/${gameId}`);

    return result;
}

//create
export const create = async (gameData) => {
    const result = await request.post(baseUrl, gameData);

    return result;
};

//edit
export const edit = async (gameId, gameData) => {
    const result = await request.put(`${baseUrl}/${gameId}`, gameData);

    return result;
};

//delete
export const remove = async(gameId) => request.remove(`${baseUrl}/${gameId}`)

//getLatest
export const getLatest = async () => {
    // const query = new URLSearchParams({
    //     // sortBy: `_createdOn desc`, //this doesn't work
    //     offset: 0, // from the beginning,
    //     pageSize: 3
    // });



    const query = encodeURIComponent(`offset=0&pageSize=3`)

    const result = await request.get(`${baseUrl}?sortBy=_createdOn%20desc&${query}`);

    return result;
}