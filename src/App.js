import React, { useState, useEffect } from 'react';

function App() {

  const [ repositories, setRepositories] = useState([
  ]);

  const [ videoPlaying, setVideoPlaying] = useState([
    'https://www.youtube.com/embed/S9uPNppGsGo'
  ]);

  const [ textSearch, setTextSearch] = useState([
  ]);

  let newUrl = ''

  useEffect(() => {
    let url;
    if(!textSearch){
      url = 'python'
    } else {
      url  = textSearch
    }
    async function fetchData() {
      const response = await fetch('https://www.googleapis.com/youtube/v3/search?part=id,snippet&q='+ url + '&maxresults=20&key=AIzaSyB2qPOWZw7J7GJ5rRjpL_tkfi4shZckQaE');
      const data = await response.json()
      console.log(data)
      setRepositories([data])
    }
    fetchData();
  }, [textSearch])


  function chooseVideo(url) {
    const urlVideoID = url.split('/')
    console.log(urlVideoID[4])
    setVideoPlaying('https://www.youtube.com/embed/' + urlVideoID[4])
  }

  function searchVideo() {
    setTextSearch(newUrl)
  }

  function textToSearch(e){
    newUrl =  e.target.value;
  }
  return (
    <>
    <div className='App'>
      <div className='row firstrow'>
        <div  className='col-sm-12 headerSearch'> 
          <input typ='text' onChange={textToSearch} ></input>  
          <button type='submit' className='btn btn-primary' onClick={ () => searchVideo()}>
            Search
          </button>
        </div>
        <div className='col-sm-4'>
            { 
              repositories.map( repo => <div key={ repo.etag } > 
              { repo.items.map( item => <div className='row itemVideo' key={item.etag} onClick={ () => chooseVideo(item.snippet.thumbnails.default.url)}>
                  <div className='col-sm-4'>
                    <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title}></img>
                  </div>
                  <div className='col-sm-8'>
                    {item.snippet.title} <br />
                    {/* {item.snippet.description} */}
                  </div>
                </div> )}
              </div>)
            }
        </div>
        <div className='col-sm-8'>
          <iframe src={videoPlaying} width='800' height='600' title='Video' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        </div>
    </div>
    </>
  )
}

export default App;
