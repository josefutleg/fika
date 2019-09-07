export const _loadWeather = () => {
  return fetch("http://localhost:8000/").then(res => res.json());
};

export default _loadWeather;
