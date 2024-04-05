/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { app } from "./firebase";
// import './App.css';

const AppData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataList, setDataList] = useState([]);
  // const [inputArray, setInputArray] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  let imageList = [];
  
  // Function to send array to backend
  const sendArrayToBackend = async (urls) => {
    try {
      console.log("Array: ", urls);
      // Change url with url of server
      const response = await axios.post('http://localhost:5000/api/data', { array: [urls, imageList] });
      setResponseMessage(response.data.success ? 'Array sent successfully' : 'Error sending array');
      fetchData();
    } catch (error) {
      // console.error('Error sending array:', error);
      setResponseMessage('Error sending array');
    }
  };

  const getURLs_data = async () => {
    // Reference to the Firebase Storage bucket
    getURLs_image();
    const storage = getStorage(app);
    const storageRef = ref(storage, 'text_data');

    // List all data in the Storage bucket
    listAll(storageRef)
      .then((result) => {
        const images = result.items.map((item) => {
          // Get the download URL for each image
          console.log("Item Data: ", item);
          return getDownloadURL(item);
        });

        // Update the state with the list of image URLs
        Promise.all(images).then((urls) => {
          // console.log("URL: ", urls);
          setDataList(urls);
          // Call sendArrayToBackend after updating imageList
          sendArrayToBackend(urls);
        });
      })
      .catch((error) => {
        console.error('Error listing images:', error);
      });
  }

  const getURLs_image = async() => {
    const storage = getStorage(app);
    const storageRef = ref(storage, 'images/default_user_id');

    // List all data in the Storage bucket
    listAll(storageRef)
      .then((result) => {
        const images_data = result.items.map((item) => {
          // Get the download URL for each image
          console.log("Item Image: ", item);
          return getDownloadURL(item);
        });

        // Update the state with the list of image URLs
        Promise.all(images_data).then((urls) => {
          console.log("URL: ", urls);
          imageList = urls;
        });
        // setImages(images_data);
      })
      .catch((error) => {
        console.error('Error listing images:', error);
      });
  }

  const fetchData = async () => {
    try {
      // Change url with url of server
      const response = await axios.get('http://localhost:5000/api/data');
        setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getURLs_data();
  }, []);

  return (
<div>
{loading ? (
  <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
      ) : (
        <table>
        <thead>
            <tr>
              <th>S.No.</th>
              <th>Material</th>
              <th>Grade</th>
              {/* <th>Thickness</th> */}
              <th>Type</th>
              {/* <th>Comments</th> */}
              <th>Weight in pounds</th>
              <th>Number of Bales</th>
              <th>IsRebale</th>
              <th>HasPalate</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="firstCol">{index+1}</td>
                <td>{item.material}</td>
                <td>{item.grade}</td>
                {/* <td>{item.thickness}</td> */}
                <td>{item.selectedType}</td>
                {/* <td>{item.comments}</td> */}
                <td>{item.weight}</td>
                <td>{item.numBales}</td>
                <td>{item.isRebale ? 'Yes' : 'No'}</td>
                <td>{item.hasPalate ? 'Yes' : 'No'}</td>
                <td><img src={item.image_url} />
                <button 
                onClick={()=>{ window.open(item.image_url, '_blank');
                }} className='view' >View</button>
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