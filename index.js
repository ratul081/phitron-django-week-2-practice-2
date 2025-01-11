const loadPhonesData = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const phonesData = await res.json();
  displayPhonesData(phonesData.data);
};

displayPhonesData = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = ``;
  const noPhoneFound = document.getElementById("no-phone-found");
  if (phones.length === 0) {
    noPhoneFound.classList.remove("d-none");
  } else {
    noPhoneFound.classList.add("d-none");
  }
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="${phone.phone_name}">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                <button id="phone-details" class="btn btn-primary my-2">See full details</button>
                </p>
            </div>
            </div>
        `;
    phoneContainer.appendChild(phoneDiv);
  });
};

document.getElementById("phone-search").addEventListener("click", function () {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhonesData(searchText);
});