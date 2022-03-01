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
    <button type="button" class="btn btn-color d-block w-100 rounded-pill" onclick="">Show Details</button>
  </div>
</div>
      `;
      searchResult.appendChild(div);
  });
};
