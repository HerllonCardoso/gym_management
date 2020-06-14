const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (const item of menuItems){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}

//Paginação
function paginate(selectedPages, totalPages){
        let pages = [];
        let oldPage;

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
            const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
            const pagesAfterSelectedPage = currentPage <= selectedPages + 2;
            const pagesBeforeSelectedPage = currentPage >= selectedPages - 2;
    

        if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage){
            if(oldPage && currentPage - oldPage > 2){
                pages.push('...');
            }

            if(oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1 );
            }
           
            pages.push(currentPage);
            oldPage = currentPage;
        }
    }

    return pages;
}

function createPagination(pagination){
const filter = pagination.dataset.filter
const page = +pagination.dataset.page
const total = +pagination.dataset.total
const pages = paginate(page, total)
let elements = ""

for (let page of pages){
    if(String(page).includes("...")){
        elements += `<span>${page}</span>`
    } else{
        if(filter){
            elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
        }else{
            elements += `<a href="?page=${page}">${page}</a>`
    }
    }
   
}

pagination.innerHTML = elements

}

const pagination = document.querySelector(".pagination")



if (pagination) {
    createPagination(pagination);
}