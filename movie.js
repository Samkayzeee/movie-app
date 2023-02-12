const apiKey = "api_key=b083888968b27e86b95bc66c849334d3";
const url = "https://api.themoviedb.org/3/";
const apiUrl = url + "discover/movie?sort_by=popularity.desc&" + apiKey;
const imgUrl = "https://image.tmdb.org/t/p/w500"
const searchUrl = url + "search/movie?" + apiKey;
const videoUrl = `https://api.themoviedb.org/3/movie/505642/videos?${apiKey}`


const result = document.getElementById("section1")
const main = document.getElementById("main");
const search = document.getElementById("search");

const vid = async () => {
    const videos = await fetch(videoUrl);
    const video = await videos.json();
    console.log(video);
}

vid();
const getMovie = async(url) => {
    try {
    const response = await fetch(url)
    const  data = await response.json();
    const movies = data.results;
    
    movieShow(movies);

    } catch (error) {
        main.innerHTML = `<h1>Videos not available<h1/>`;
        console.log(`${error}`);
    }
}
getMovie(apiUrl);

const movieShow = async(data) => {
    main.innerHTML = ``;

    data.forEach(movie => {
        const {title, poster_path, vote_average, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        
        <img loading="lazy" src="${imgUrl+poster_path}" alt=${title}>

            <div class="info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)} main_rating">${vote_average}</span>
            </div>    
        </div>
        `
        main.appendChild(movieEl);

    });
}

const getColor = (vote) => {
    if (vote >= 8 ) {
        return "rating"
    }
    else if (vote >= 5) {
        return "medium"
    }
    else{
        return "low"
    }
} 

result.addEventListener('input', (e) => {
    e.preventDefault();

    const searchResult = search.value;

    if (searchResult) {
        getMovie(searchUrl+'&query='+searchResult)
    }
    else{
        getMovie(apiUrl);
    }
})