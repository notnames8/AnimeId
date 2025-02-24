
let page = 1;

let API_PAGE_URL = "https://api.jikan.moe/v4/anime?page="
async function getAnime(API_URL){
    const anime = await fetch(`${API_URL}${page}`)
    const response = await anime.json()
    document.getElementById("total").innerHTML = response.pagination.last_visible_page
    // console.log(response.data)
    showAnime(response.data)
}
function mainPage(){
    getAnime(API_PAGE_URL);
    document.getElementById("page").innerHTML = page
}
function showAnime(anime){
   // console.log(anime)
    document.getElementById("animecard").innerHTML = "";
    anime.forEach(anime => {
        let card = document.createElement("a");
        card.classList.add("card");
        card.href = `${anime.url}`
        card.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="" class="card-img">
            <div class="card-info">
                <h2>${anime.title}</h2> 
            </div>
        `;
        document.getElementById("animecard").appendChild(card);
    });
}

document.getElementById("prev").addEventListener("click", () => {
    if(page > 1){
        page--;
        mainPage();
    }
})
document.getElementById("next").addEventListener("click", () => {
    page++;
    mainPage();
})

mainPage();

document.getElementById("search-form").addEventListener("submit", (e) => {
    let search = document.getElementById("searchinput").value;
    e.preventDefault();
    API_SEARCH_URL = `https://api.jikan.moe/v4/anime?q=${search}`
    getAnime(API_SEARCH_URL);
    // console.log(getAnime)
})

document.getElementById("searchbtn").addEventListener("click", () => {
    let search = document.getElementById("searchinput").value;
    API_SEARCH_URL = `https://api.jikan.moe/v4/anime?q=${search}`
    getAnime(API_SEARCH_URL);
    // console.log(getAnime)
})

document.getElementById("title").addEventListener("click", () => {
    location.reload();
})
