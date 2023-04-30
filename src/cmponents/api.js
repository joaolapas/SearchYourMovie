const key =  '017e1e92a1324788e95df6d2e4c8a253'

export const search = async (movie, page) => {
    try{
        let url = `
        https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${movie}&page=${page}`
        const response = await fetch(url);
        return await response.json();
    }catch(err){
        console.log(err.message)
    }
}

export const getById = async (movie) => {
    try{
        let url = `https://api.themoviedb.org/3/movie/${movie}?api_key=${key}`
        const response = await fetch(url);
        return await response.json();
    }catch(err){
        console.log(err.message)
    }
}