import axios from "axios";
async function summarizeText(text) {

  let data = JSON.stringify({
    "inputs": text,
    "parameters": {
      "max_length": 100,
      "min_length": 30
    }
  });
  const mySecret = process.env.API_KEY;
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + mySecret
    },
    data : data
  };

    try {
      const response = await axios.request(config);
      return response.data[0].summary_text;
    }
    catch (error) {
      console.log(error);
    }
}


export default summarizeText;