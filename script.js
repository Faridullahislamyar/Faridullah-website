const accessKey = "SKWUMG622Zwm5Ae2Limn08RGH1RDRDcV06T0CsY7V6M";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value.trim();
    if (!keyword) {
        alert("مهرباني! د عکس نوم داخل کړئ");
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    results.forEach((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });

    // Show more button functionality
    if (data.total_pages > page) {
        showMoreBtn.style.display = "block";
    } else {
        showMoreBtn.style.display = "none";
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchResult.innerHTML = ""; // Clear previous results
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});

showMoreBtn.style.display = "none"; // Initially hide the show more button

