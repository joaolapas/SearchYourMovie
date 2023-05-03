const key =  '017e1e92a1324788e95df6d2e4c8a253'

export const search = async (movie, page, year) => {
    try{
        if(movie === ''){throw new Error('Must insert something to search for!')}
        let url = `
        https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${movie}&page=${page}&include_adult=false${'&primary_release_year='+year}`
        const response = await fetch(url);
        if(response.results === []){
            return 'Nothing found!'
        }
        return await response.json();
    }catch(err){
        console.log(err.message)
    }
}

export const latest = async ({page}) => {
    try{
        let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=${page}`
        const response = await fetch(url);
        return await response.json();
    }catch(err){
        console.log(err.message)
    }
}
export const popular = async ({page}) => {
    try{
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${page}`
        const response = await fetch(url);
        return await response.json();
    }catch(err){
        console.log(err.message)
    }
}
export const topRated = async ({page}) => {
    try{
        let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=${page}`
        const response = await fetch(url);
        return await response.json();
    }catch(err){
        console.log(err.message)
    }
}
export const getVideoById = async (id) => {
    try{
        let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}&language=en-US`
        const response = await fetch(url);
        return await response.json();
    }catch(err){
        console.log(err.message)
    }
}
export const getDetails = async (id) => {
    try{
        let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`
        const response = await fetch(url);
        return await response.json();
    }catch(err){
        console.log(err.message)
    }
}