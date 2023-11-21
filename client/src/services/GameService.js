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
