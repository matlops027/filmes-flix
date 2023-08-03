import axios from 'axios';
import { API_KEY, URL_BASE_API } from '../constants';

const api = axios.create({
    baseURL: URL_BASE_API
});

export function getNowPlayingMovies() {
    return api.get("movie/now_playing", {
        params: {
            api_key: API_KEY,
            language: "pt-BR",
            page: 1
        }
    });
}

export function getFilme(id) {
    return api.get(`movie/${id}`, {
        params: {
            api_key: API_KEY,
            language: "pt-BR"
        }
    });
}