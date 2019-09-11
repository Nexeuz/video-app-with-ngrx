module.exports = () => {
  const data = {
    movies: []
  };
  for(let i = 0; i < 30; i++) {
    data.movies.push({
      id: i+1,
      title: 'lorem',
      description: 'lorem',
      img: 'https://tfwiki.net/mediawiki/images2/thumb/9/96/BumblebeeMovieNewPoster.jpeg/300px-BumblebeeMovieNewPoster.jpeg',
      director: 'Nicolas Falla',
      price: 20000,
      quantity: 10,
      actorList: ['Will Smith', 'Johnny Depp', 'Adam Sandler', 'Vin Diesel', 'Jackie Chan']
    })
  }
  return data;
};

