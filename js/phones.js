// fetching the data from the api and display in the card

const onLoadPhones = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones,isShowAll);

}
// display the data
function displayPhones(phones, isShowAll) {
  const phoneContainer = document.getElementById('phone-container')
  // clearing the ui after every search
  const showAll = document.getElementById('show-all-btn')
  if (phones.length > 12 & !isShowAll) {
    showAll.classList.remove('hidden')

  }
  else
    showAll.classList.add('hidden')
  // displaying first twelve search result
  phoneContainer.innerText = '';
  // console.log('isShowAll', isShowAll)

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach(phone => {
    // console.log(phone);
    const card = document.createElement('div')

    card.classList = `card bg-gray-100 shadow-xl text-center p-4`
    card.innerHTML = `
                <div class="">
              <figure><img src="${phone.image}" alt="Shoes" /></figure>
              <div class="card-body">
                <h2 class="card-title flex justify-center">${phone.phone_name}</h2>
                <p>${phone.slug}</p>
                <div class="card-actions justify-center">
                  <button class="btn btn-primary" onclick="handleShowDetails('${phone.slug}')" onclick = "show_modal_details.showModal()">Show More</button>
                </div>
              </div>
            
    `
    phoneContainer.appendChild(card)

  });
  loadingSpinner(false);

}
// implementing search functionality 
const searchPhone = (isShowAll) => {
  loadingSpinner(true);
  const searchField = document.getElementById('search-field')
  const searchText = searchField.value;
  // console.log(searchText);
  onLoadPhones(searchText,isShowAll);
  // searchField.value = ''
}
// onLoadPhones();
// loading spinner functionality


const loadingSpinner = (isLoading) => {
  const loadingSpin = document.getElementById('loading-spinner')
  if (isLoading) {
    loadingSpin.classList.remove('hidden')
  }
  else {
    loadingSpin.classList.add('hidden')
  }
}

// Handle show all button

const handleShowAll = () => {
  searchPhone(true);

}

const handleShowDetails = async (id) => {
  const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phone = data.data
  console.log(phone);
  show_modal_details.showModal();
  showAllMobileInfo(phone);

}

// show detail mobile information
const showAllMobileInfo = (phone) => {
  const showDetailInfo = document.getElementById('show-detail-info');
  showDetailInfo.innerHTML = `
      <img src ="${phone.image}" class = "mx-auto my-6 bg-gray-200">
      <h3 class ="mb-6 text-2xl font-bold">${phone.name}</h3>
      <h5 class = "mb-6 font-bold">Storage: <span class = "font-normal text-gray-400 text-sm">${phone.mainFeatures.storage}</span></h5>
      <h5 class = "mb-6 font-bold">Display Size: <span class = "font-normal text-gray-400 text-sm">${phone.mainFeatures.displaySize}</span></h5>
      <h5 class = "mb-6 font-bold">Chipset: <span class = "font-normal text-gray-400 text-sm">${phone.mainFeatures.chipSet}</span></h5>
      <h5 class = "mb-6 font-bold">Memory: <span class = "font-normal text-gray-400 text-sm">${phone.mainFeatures.memory}</span></h5>
      <h5 class = "mb-6 font-bold">Slug: <span class = "font-normal text-gray-400 text-sm">${phone.slug}</span></h5>
      <h5 class = "mb-6 font-bold">Release Date: <span class = "font-normal text-gray-400 text-sm">${phone.releaseDate}</span></h5>
      <h5 class = "mb-6 font-bold">Brand: <span class = "font-normal text-gray-400 text-sm">${phone.brand}</span></h5>
  `

}
// onLoadPhones();