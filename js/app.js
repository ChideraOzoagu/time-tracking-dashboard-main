const jsonData = "./js/data.json";
const getData = async () => {
  try {
    const resp = await fetch(jsonData);
    if(!resp.ok){
      const message = `There was an error "${resp.status} ${resp.statusText}"`
      throw new Error(message)
    }
   const data = await resp.json();
  //  console.log(data);
  } catch (error) {
    console.log(error);
  }
};
// getData()

const menuBtns = document.querySelectorAll('.menu-btn');
const currentTime = document.querySelector('.current-time');
const previousText = document.querySelector('.previous-text');
const peviousTime = document.querySelector('previous-time');

menuBtns.forEach((menuBtn)=>{
  menuBtn.addEventListener('click', getData)
})

function menuClick (e){
  e.currentTarget
}