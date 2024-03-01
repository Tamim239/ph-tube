const shortBtn = document.getElementById("short-btn");
let fetchApiId;
let shorted = false;
shortBtn.addEventListener("click", () => {
    shorted = true;
    categoryDetailsApi(fetchApiId, shorted)
})

const categoriesAPi = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await res.json()
    const allCategories = data.data
    allCategoriesBtn(allCategories);
}
const allCategoriesBtn = (data) => {
    //    console.log(data)
    const btnContainer = document.getElementById("btn-container");
    data.forEach(btn => {
        // console.log(btn)
        const button = document.createElement("button");
        button.classList = "btn category-btn bg-gray-300 px-5 ";
        button.innerText = btn.category;
        button.addEventListener("click", () => {
            categoryDetailsApi(btn.category_id)
            const allBtn = document.querySelectorAll(".category-btn");
            for (const btn of allBtn) {
                btn.classList.remove("bg-red-600")
            }
            button.classList.add("bg-red-600")
            button.classList.add("text-white")
        })
        btnContainer.appendChild(button)
    })
}


// category details api
const dataError = document.getElementById("error-data");
const categoryDetailsApi = async (id, shorted) => {
    fetchApiId = id;
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json()
    const details = data.data;
    // console.log(details)
    if (details.length === 0) {
        dataError.classList.remove("hidden")
    }
    else {
        dataError.classList.add("hidden");
    }
  console.log(!shorted)
    if (shorted) {
        details.sort((a, b) => {
            const firstViews = a.others?.views;
            const secondViews = b.others?.views;
            const totalFirstViews = parseFloat(firstViews.replace("k", '' || 0))
            const totalSecondViews = parseFloat(secondViews.replace("k", '' || 0))
            return totalSecondViews - totalFirstViews;

        })
    }
    categoryDetails(details)
}

let isVerified = '';
const categoryDetails = (id) => {
    const cardContainer = document.getElementById("card-container")
    cardContainer.textContent = ''
    id.forEach(data => {
        console.log(data)
        if (data.authors[0].verified) {
            isVerified = ` <img src="images/fi_10629607.svg" alt="logo">`
        }
        const div = document.createElement("div")
        div.classList = "card card-compact shadow-xl py-2 h-80";
        div.innerHTML = `
                    <figure><img src="${data.thumbnail}" /></figure>
                    <div class="">
                      <div class="flex gap-3 space-y-3">
                        <img src="${data?.authors[0]?.profile_picture}" alt="picture" class="relative size-10 rounded-full top-4">
                        <p class="absolute top-28 right-4 bg-gray-800 text-white p-1 rounded-lg">3hrs 56 min ago</p>
                         <div class="space-y-2">
                            <p class="font-bold">Building a Winning UX Strategy Using the Kano Model</p>
                         </div>
                      </div>
                      <div class="flex gap-3 items-center pl-12 ">
                        <h1 class="text-gray-600">Awlad Hossain</h1>
                       ${isVerified}
                    </div>
                     <h1 class="pl-12 text-gray-600">${data?.others?.views} views</h1>
                    </div>
           
        `
        cardContainer.appendChild(div)
    })

}


categoriesAPi();
categoryDetailsApi( 1000,shorted);
