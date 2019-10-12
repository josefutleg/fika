// export const _loadWeather = () => {
//   return fetch("http://localhost:8000/").then(res => res.json());
// };

// export default _loadWeather;

export const _loadCurrentWeather = () => {
  return fetch("http://localhost:8000/currentWeather").then(res => res.json());
};

export default _loadCurrentWeather;
