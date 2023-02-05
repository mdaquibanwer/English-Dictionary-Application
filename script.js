const container = document.querySelector(".container"),
searchInput = container.querySelector("input"),
infoText = container.querySelector(".info"),
synonymsData = container.querySelector(".synonyms .list"),
removeDataIcon = container.querySelector(".search .x-bar");

const data = (result, word)=>{
    if(result.title){
        infoText.innerHTML = `can't find the word <span>${word}</span> , please try to search another word`;
    }else{
        container.classList.add("active");
        let definitons = result[0].meanings[0].definitions[0],
        phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;
        // now pass the data to the html element
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = definitons.definition;
        document.querySelector(".example span").innerText = definitons.example;

        if(result[0].meanings[0].synonyms[0] == undefined){
            synonymsData.parentElement.style.display = "none";
        }else{
            synonymsData.parentElement.style.display = "block";
            synonymsData.innerHTML = "";
            for(let i=0;i<5;i++){
                let tag =`<span>${result[0].meanings[0].synonyms[i]},</span>`
                synonymsData.insertAdjacentHTML("beforeend",tag);
            }
        }
    }
}

const fetchApi = (word)=>{
    infoText.style.color = "#000";
    infoText.innerHTML = `searching the meaning of <span>"${word}"</span>`;
    let URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(URL).then(res => res.json().then(result => data(result, word)));
}
removeDataIcon.addEventListener("click",()=>{
    searchInput.value = "";
    searchInput.focus();
    container.classList.remove("active");
    infoText.style.color = "#999";
    infoText.innerHTML = "Type a word and press enter to get the meaning"
})

searchInput.addEventListener("keyup",(e)=>{
    if(e.key === "Enter" && e.target.value){
        fetchApi(e.target.value);
    }
})
