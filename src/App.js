import './App.css';
import { useState } from 'react';
import Loader from 'react-loader';
import Logo from './components/Logo/Logo';
import TextInput from './components/TextInput/TextInput';
import ParticlesDesign from './components/ParticlesDesign/ParticlesDesign';


function App() {
const [image, setImage] = useState('');
const [loading, setLoading] = useState(false);
const [isButtonClicked, setisButtonClicked] = useState(false);
const [apiSuccess, setApiSuccess] = useState(false);
const [error, setError] = useState(false);

const onButtonGenerate = () => {
    setLoading(true);
    setisButtonClicked(true);
    setImage('');
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result && result.outputs && result.outputs[0] && result.outputs[0].data && result.outputs[0].data.image && result.outputs[0].data.image.base64){
          const imageBase64 = result.outputs[0].data.image.base64;
          setImage(`data:image/jpeg;base64,${imageBase64}`);
          setApiSuccess(true);
        }
        else{
          setApiSuccess(false);
        }
        setLoading(false);
      })      
    .catch(error => {
      setLoading(false);
      setError(true);
      console.log('error', error);
    });
}

const downloadImage = () => {
  const downloadLink = document.createElement('a');
  downloadLink.href = image;
  downloadLink.download = `${RAW_TEXT}.jpg`;
  downloadLink.click();
}
const handleInputChange = (event) => {
  const updatedText = event.target.value;
  setRAW_TEXT(updatedText);
}

const PAT = 'f08372c895234385b6aa5f4ccd5e1a5b';    
const USER_ID = 'openai';
const APP_ID = 'dall-e';
const MODEL_ID = 'dall-e-3';
const MODEL_VERSION_ID = 'dc9dcb6ee67543cebc0b9a025861b868';
let [RAW_TEXT, setRAW_TEXT] = useState('');

const raw = JSON.stringify({  
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
    {
        "data": {
          "text": {
                "raw": RAW_TEXT
            }
        }
    }
],
      
});

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};



  return (
    <div>
      <ParticlesDesign />
      <Logo />
      <div>
        <p className='title'>Photon would generate an image based on your text. Give it a try!</p>
      </div>
      <TextInput handleInputChange={ handleInputChange } onButtonGenerate={ onButtonGenerate } />
      <div id='generatedImage'>
        {isButtonClicked && !image && !loading && !apiSuccess && !error && <span>What??? Try something else please<span style={{ fontSize: '30px' }}>&#128578;</span></span>}
        {image && !loading && <img src={image} alt='generatedImage' />}
      </div>
      <div className='loaderDiv'>
        <div>{loading && !error && <span>Loading image</span>}</div>
        <div>{loading && !error && <Loader color='#121212' className='loader' loaded={false}></Loader>}</div>
      </div>
      <div id='buttonDiv'>
        {image && !loading && <button className='downloadBtn' onClick={downloadImage}>Download</button>}
      </div>
    </div>
  );
}

export default App;
