// Handle Search button
const searchField = document.getElementById("search-field");
// Load Phone API
const loadPhones = () => {
   const url = `https://openapi.programming-hero.com/api/phones?search=${searchField.value}`;

   // clear data
    searchField.value = '';
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));
};

//   Display phones
const displayPhones = (phones) => {
   const searchResult = document.getElementById("search-result");
   searchResult.textContent = '';
  phones.slice(0, 20).forEach((phone) => {
   //   console.log(phone.phone_name);
      const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
      <div class="card w-75 mx-auto p-3 bg-color">
  <img src="${phone.image}" class="card-img-top" alt="phone image">
  <div class="card-body">
    <h5 class="card-title">${phone.brand}</h5>
    <h6 class="card-text">${phone.phone_name}</h6>
    <button type="button" class="btn btn-color d-block w-100 rounded-pill" data-bs-toggle="modal" data-bs-target="#phone-details" onclick="phoneDetails('${phone.slug}')">Show Details</button>
  </div>
</div>
      `;
      searchResult.appendChild(div);
  });
};
// display phone details 
const phoneDetails = phoneID => {
   // console.log(phoneID);
   const url = `https://openapi.programming-hero.com/api/phone/${phoneID}`;
   fetch(url)
      .then((res) => res.json())
      .then((data) => displayPhoneDetails(data.data));
};

const displayPhoneDetails = phoneInfo => {
   // console.log(phoneInfo.brand);
   const modalContainer = document.getElementById("modal-dialog-box");
   const div = document.createElement("div");
   // div.classList.add("row");
   div.innerHTML = `
   <div class="modal-header">
     <h3 class="modal-title" id="phone-details">Phone Details</h3>
     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
   </div>
   <div>
   <div class="w-75 my-4 mx-auto">
    <img src="${phoneInfo.image}" class="card-img-top" alt="phone image">
   </div>
     <h3>Brand: ${phoneInfo.brand}</h3>
     <h5>Name: ${phoneInfo.name}</h5>
   </div>
   <div class="modal-footer">
        <button type="button" class="btn btn-color" data-bs-dismiss="modal">Close</button>
   </div>
   `;
   modalContainer.textContent = "";
   modalContainer.appendChild(div);
}
