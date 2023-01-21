import axios from 'axios';

export const getNews = async () => {
	return await axios.get('https://api.polygon.io/v2/reference/news?apiKey=yoaHzupExeXXmqctzmJOyMItaX5cHy3u');
};
