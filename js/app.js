
  // Handle Search button
   const searchField = document.getElementById("search-field");

   // Load Phone API
   const loadPhones = () => {
      const url = `https://openapi.programming-hero.com/api/phones?search=${searchField.value}`;
      fetch(url)
         .then((res) => res.json())
         .then((data) => console.log(data));
     };
  
