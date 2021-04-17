
/* Global Variables */
const zip = document.querySelector('#zip')
const feel = document.querySelector('.myInput')
const generate = document.querySelector('#generate')
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// function to get zip from inputs to pass it weather api 
const performAction = async () => {
  const key = '&appid=4ee8039e97c0cd5db1d9492f7bb61f77&units=metric'
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip.value}`
  if(zip.value=== '' || feel.value === '') {
    return alert('Please check the inputs Fields')
  } else{

    const data = await getWeather(baseUrl, key)
    postData('/add', { date: newDate, temp: data, feel: feel.value })
    updateUI()
  }
}
// get weather temp with zip code and celsius
const getWeather = async (baseUrl, key) => {
  
  const res = await fetch(baseUrl + key)
  if (res.status === 200) {
    const data = await res.json()
    const apiData = data.main.temp
    return apiData
  } else {  alert('please check the zip code')  }
}

// post weather data to server side
const postData = async (url = '', data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}
generate.addEventListener('click', performAction)

// get weather data from server side and update the UI 
const updateUI = async () => {
  const res = await fetch('/add')
  const data = await res.json()

  let date = document.querySelector('#date')
  let temp = document.querySelector('#temp')
  let content = document.querySelector('#content')
   temp.innerHTML = ` Temprature: ${data.temp} <span> &#8451; </span>`
  date.textContent = `date: ${data.date}` 
  content.textContent = `i feel: ${data.feel}`

}
