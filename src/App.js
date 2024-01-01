import './App.css';
import Logo from './components/Logo/Logo';
// import Navigation from './components/Navigation/Navigation';
import TextInput from './components/TextInput/TextInput';
import ParticlesDesign from './components/ParticlesDesign/ParticlesDesign';
import { useState } from 'react';

function App() {
const [text, setText] = useState('');
const [image, setImage] = useState('');
const onButtonGenerate = () => {
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        const imageBase64 = result.outputs[0].data.image.base64;
        setImage(`data:image/jpeg;base64,${imageBase64}`);
      })      
    .catch(error => console.log('error', error));
}
const downloadImage = () => {
  const downloadLink = document.createElement('a');
  downloadLink.href = image;
  downloadLink.download = 'generated-image.jpg';
  // Trigger a click event on the link to prompt the download
  downloadLink.click();
}
const handleInputChange = (event) => {
  const updatedText = event.target.value;
  setRAW_TEXT(updatedText);
}
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // In this section, we set the user authentication, user and app ID, model details, and the prompt text we want
// // to provide as an input. Change these strings to run your own example.
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = 'f08372c895234385b6aa5f4ccd5e1a5b';    
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'openai';
const APP_ID = 'dall-e';
// Change these to whatever model and text you want to use
const MODEL_ID = 'dall-e-3';
const MODEL_VERSION_ID = 'dc9dcb6ee67543cebc0b9a025861b868';
let [RAW_TEXT, setRAW_TEXT] = useState('');
// To use a hosted text file, assign the URL variable
// const TEXT_FILE_URL = 'https://samples.clarifai.com/negative_sentence_12.txt'

///////////////////////////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
///////////////////////////////////////////////////////////////////////////////////

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
              // "url": TEXT_FILE_URL
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
      {/* <Navigation />  */}
      <ParticlesDesign />
      <Logo />
      <div>
        <p>Photon would generate an image based on your text. Give it a try!</p>
      </div>
      <TextInput handleInputChange={ handleInputChange } onButtonGenerate={ onButtonGenerate } />
        <div id='generatedImage'>
        {image && 
          <img src={ image } alt='generatedImage' />
        }
      </div>
      <div id='buttonDiv'>
        {image && 
          <button className='downloadBtn' onClick={downloadImage}>Download</button>
        }
      </div>
        
    </div>
  );
}

export default App;
