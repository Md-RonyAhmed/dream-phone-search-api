document.getElementById("error-message").style.display = "none";
document.getElementById("null-error").style.display = "none";
document.getElementById("invalid").style.display = "none";
// Handle Search button
const searchField = document.getElementById("search-field");

// Load Phone API
const loadPhones = () => {
   const url = `https://openapi.programming-hero.com/api/phones?search=${searchField.value}`;
   if (searchField.value === "") {
      document.getElementById("null-error").style.display = "block";
      document.getElementById("invalid").style.display = "none";
      displayPhones();
      searchResult.textContent = "";
      return;
   }
   // clear data
   searchField.value = "";
   fetch(url)
      .then((res) => res.json())
      .then((data) => displayPhones(data.data))
      .catch((error) => displayError(error));
};

// display error message
const displayError = error => {
   document.getElementById("error-message").style.display = "block";
};

//   Display phones
const displayPhones = phones => {
   const searchResult = document.getElementById("search-result");
   searchResult.textContent = "";
   if (phones.length === 0) {
      document.getElementById("invalid").style.display = "block";
      document.getElementById("null-error").style.display = "none";
      searchResult.textContent = "";
      return;
   }
   phones?.slice(0, 20).forEach(phone => {
      //   console.log(phone.phone_name);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
      <div class="card w-100 mx-auto p-3 bg-color">
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
   document.getElementById("null-error").style.display = "none";
   document.getElementById("invalid").style.display = "none";
};

// display phone details
const phoneDetails = phoneID => {
   // console.log(phoneID);
   const url = `https://openapi.programming-hero.com/api/phone/${phoneID}`;
   fetch(url)
      .then((res) => res.json())
      .then((data) => displayPhoneDetails(data.data));
};
// display phone details function
const displayPhoneDetails = phoneInfo => {
   const modalContainer = document.getElementById("modal-dialog-box");
   const div = document.createElement("div");
   div.innerHTML = `
   <div class="modal-header">
     <h3 class="modal-title" id="phone-details">Phone Details</h3>
     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
   </div>
   <div>
   <div class="w-50 my-4 mx-auto">
    <img src="${phoneInfo.image}" class="card-img-top" alt="phone image">
   </div>
     <div class="p-3">
         <h3>Brand: ${phoneInfo.brand}</h3>
         <h4>Model Name: ${phoneInfo.name}</h4>
         <small>${phoneInfo?.releaseDate
         ? phoneInfo.releaseDate
         : "Released date not available"
      } </small>
     </div>
     <div class="p-3">
          <h4>Main Features:</h4>
          <p><span class="fw-bold">Storage:</span> ${phoneInfo.mainFeatures.storage}</p>
          <p><span class="fw-bold">Display Size:</span> ${phoneInfo.mainFeatures.displaySize}</p>
          <p><span class="fw-bold">Chip-set:</span> ${phoneInfo.mainFeatures.chipSet}</p>
          <p><span class="fw-bold">Memory:</span> ${phoneInfo.mainFeatures.memory}</p>
          <p><span class="fw-bold">Sensors:</span> ${phoneInfo.mainFeatures.sensors}</p>
          <h4>Others:</h4>
          <p><span class="fw-bold">WLAN:</span> ${phoneInfo.others?.WLAN ? phoneInfo.others.WLAN : "WLAN not available right now"}</p>
          <p><span class="fw-bold">Bluetooth:</span> ${phoneInfo.others?.Bluetooth
         ? phoneInfo.others.Bluetooth
         : "Bluetooth not available right now"
      }</p>
          <p><span class="fw-bold">GPS:</span> ${phoneInfo.others?.GPS
         ? phoneInfo.others.GPS
         : "GPS not available right now"
      }</p>
          <p><span class="fw-bold">NFC:</span> ${phoneInfo.others?.NFC
         ? phoneInfo.others.NFC
         : "NFC not available right now"
      }</p>
          <p><span class="fw-bold">Radio:</span> ${phoneInfo.others?.Radio
         ? phoneInfo.others.Radio
         : "Radio not available right now"
      }</p>
          <p><span class="fw-bold">USB:</span> ${phoneInfo.others?.USB
         ? phoneInfo.others.USB
         : "USB not available right now"
      }</p>
     </div>
   </div>
   <div class="modal-footer">
        <button type="button" class="btn btn-color" data-bs-dismiss="modal">Close</button>
   </div>
   `;
   modalContainer.textContent = "";
   modalContainer.appendChild(div);
};
