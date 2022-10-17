import { getAdsFromDb } from "../config/firebase.js"



let item = JSON.parse(localStorage.getItem("item"))

if(item == null){
  console.log('nothing');
  let create = document.getElementById('create')
  create.style.display = 'none'


}
else{
  console.log('exist---->');
  let create = document.getElementById('create')
  create.style.display = 'inline-block'
  
}


async function getAds(){
  const ads = await getAdsFromDb();
  console.log(ads);



  for (const item of ads) {
    let body = document.getElementById('body_cards')

    body.innerHTML += `
    <div onclick="goToDetail('${item.id}')" class="cursor-pointer rounded overflow-hidden shadow-lg ml-[20px] mr-[20px] mb-[10px]">
    <img class="w-full h-[200px]" src=${item.image} alt="Mountain">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">${item.title}</div>
      <p class="text-gray-700 text-base">
        ${item.Address}
      </p>
    </div>
    
    <div>
    <p></p>
    </div>
    
    </div>
    
    `

    console.log(item.id);
  }





}


getAds()

window.goToDetail = function(id){
  location.href = `detail.html?=${id}`
}








