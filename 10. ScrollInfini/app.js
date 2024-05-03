const imagesList = document.querySelector(".images-list")
const errorMsg = document.querySelector(".error-msg")

let searchQuery = "random";
let pageIndex = 1;

async function fetchData(){
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchQuery}&client_id=FckYIRrm3hrRYbnJmOEcBGTyrdc9zCsNzyB2QFhN-WY`)
  
    if(!response.ok) {
      throw new Error(`Erreur: ${response.status}`)
    }

    const data = await response.json()
    createImages(data.results)

    if(!data.total){
      imagesList.textContent = "";
      throw new Error("Woops, nothing like that in the database, please try a more precise word :)")
    }

  }
  catch(error){
    errorMsg.textContent = `${error}`
  }
}
fetchData()

function createImages(data){
  data.forEach(img => {
    const newImg = document.createElement("img");
    newImg.src = img.urls.regular;
    imagesList.appendChild(newImg)
  })
}

const observer = new IntersectionObserver(handleIntersect, {rootMargin: "50%"})
observer.observe(document.querySelector(".infinite-marker"))

function handleIntersect(entries){
  if(window.scrollY > window.innerHeight && entries[0].isIntersecting){
    pageIndex++;
    fetchData()
  }
}

const input = document.querySelector("#search");
const form = document.querySelector("form");

form.addEventListener("submit", handleSearch)

function handleSearch(e){
  e.preventDefault();

  imagesList.textContent = "";
  if(!input.value){
    errorMsg.textContent = "The search cannot be empty !"
    return;
  }

  errorMsg.textContent = "";
  searchQuery = input.value;
  pageIndex = 1;
  fetchData()
}

const scrollToTop = document.querySelector(".scroll-to-top");

scrollToTop.addEventListener("click", backToTop)

function backToTop(){
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}
