import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { app } from "./firebase";

const AppData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageList, setImageList] = useState([]);
  const [inputArray, setInputArray] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  
  // Function to send array to backend
  const sendArrayToBackend = async (urls) => {
    try {
      // console.log("Array: ", urls);
      const response = await axios.post('https://photoclick.onrender.com/api/data', { array: urls });
      setResponseMessage(response.data.success ? 'Array sent successfully' : 'Error sending array');
      fetchData();
    } catch (error) {
      // console.error('Error sending array:', error);
      setResponseMessage('Error sending array');
    }
  };

  const getURLs = async () => {
    // Reference to the Firebase Storage bucket
    const storage = getStorage(app);
    const storageRef = ref(storage, 'text_data');

    // List all items in the Storage bucket
    listAll(storageRef)
      .then((result) => {
        const images = result.items.map((item) => {
          // Get the download URL for each image
          // console.log("Item: ", item);
          return getDownloadURL(item);
        });

        // Update the state with the list of image URLs
        Promise.all(images).then((urls) => {
          // console.log("URL: ", urls);
          setImageList(urls);
          // Call sendArrayToBackend after updating imageList
          sendArrayToBackend(urls); 
        });
      })
      .catch((error) => {
        console.error('Error listing images:', error);
      });
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('https://photoclick.onrender.com/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getURLs();
  }, []);

  return (
<div>
<h1 className="title">VIM RECYCLER</h1>
      <hr/>
{loading ? (
        <p>Loading...</p>
      ) : (
        <table>
        <thead>
            <tr>
              <th>S.No.</th>
              <th>Material</th>
              <th>Grade</th>
              <th>Thickness</th>
              <th>Comments</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="firstCol">{index+1}</td>
                <td>{item.material}</td>
                <td>{item.grade}</td>
                <td>{item.thickness}</td>
                <td>{item.comments}</td>
                <td><img src={item.image_url}/>
                <button onClick={()=>{ window.location.href=item.image_url}}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AppData;