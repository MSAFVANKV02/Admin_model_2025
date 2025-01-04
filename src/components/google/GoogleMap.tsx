// import React, { useEffect, useState } from 'react';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// import TaskModal, { TaskModalContent, TaskModalFooter, TaskModalHeader } from '../modals/TaskModal';
// import MyCloseIcon from '../icons/My_CloseIcon';
// import AyButton from '../myUi/AyButton';

// type Props = {
//   setFieldValue: any;
// };

// const containerStyle = {
//   width: '100%',
//   height: '400px',
// };

// const center = {
//   lat: 28.7041, // Default to a location in Delhi (can be changed)
//   lng: 77.1025,
// };

// export default function GoogleMapModal({ setFieldValue }: Props) {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: 'AlzaSy6Y1_RkdZ_JtlecBl6bFHUXuQwbf-CnjmB', // Replace with your API key
//     libraries: ['places'], // Include 'places' if you want autocomplete functionality
//   });

//   const [markerPosition, setMarkerPosition] = useState(center);

//   const handleMapClick = (event: google.maps.MapMouseEvent) => {
//     const latLng = event.latLng;
//     if (latLng) {
//       const newPos = { lat: latLng.lat(), lng: latLng.lng() };
//       console.log(newPos,'newPos');
      
//       setMarkerPosition(newPos);
//       setFieldValue('google_location', `${newPos.lat}, ${newPos.lng}`);
//     }
//   };

//   return (
//     <TaskModal>
//       <TaskModalHeader>
//         <div className="w-full">
//           <span>Set Location</span>
//         </div>
//         <MyCloseIcon onClick={() => {}} />
//       </TaskModalHeader>
//       <TaskModalContent>
//         {isLoaded ? (
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={markerPosition}
//             zoom={12}
//             onClick={handleMapClick}
//           >
//             <Marker position={markerPosition} />
//           </GoogleMap>
//         ) : (
//           <div>Loading...</div>
//         )}
//       </TaskModalContent>
//       <TaskModalFooter>
//         <AyButton title="Set This Location" onClick={() => {}} />
//       </TaskModalFooter>
//     </TaskModal>
//   );
// }
// =====
import  { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import TaskModal, { TaskModalContent, TaskModalFooter, TaskModalHeader } from '../modals/TaskModal';
import MyCloseIcon from '../icons/My_CloseIcon';
import AyButton from '../myUi/AyButton';
import CircularProgress from '@mui/material/CircularProgress';
import { useModal } from '@/providers/context/context';
import { makeToast } from '@/utils/toaster';
// import axios from 'axios';

type Props = {
  setFieldValue: any;
  setGoogleAddress: (address: string) => void;
  googleAddress?: string;
};

const containerStyle = {
  width: '100%',
  height: '400px',
};

export default function GoogleMapModal({ setFieldValue }: Props) {
    const {setIsOpen} = useModal()
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AlzaSy6Y1_RkdZ_JtlecBl6bFHUXuQwbf-CnjmB', // Replace with your API key
    libraries: ['places'], // Include 'places' if you want autocomplete functionality
  });

  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

  // Function to get the current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition({ lat: latitude, lng: longitude });
          setFieldValue('google_location', `${latitude}, ${longitude}`);
        },
        (error) => {
          console.error("Error getting location: ", error);
          // Use a default location (Delhi, in this case) if location is not available
          setMarkerPosition({ lat: 28.7041, lng: 77.1025 });
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setMarkerPosition({ lat: 28.7041, lng: 77.1025 }); // Default to Delhi
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const latLng = event.latLng;
    if (latLng) {
      const newPos = { lat: latLng.lat(), lng: latLng.lng() };
      console.log(newPos, 'newPos');
      setMarkerPosition(newPos);
    //   setFieldValue('google_location', `${newPos.lat}, ${newPos.lng}`);
    }
  };

  const handleSaveGoogleLocation = async () =>{

    // try {
    //     const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    //     const res = await axios.post(url)
    // } catch (error) {
    //     console.error('Error fetching address from nominatim:', error);
    //     makeToastError("Error fetching address from Nominatim")
    //     return;
    // }

    if(markerPosition){
        makeToast("Google Location Added")
      setFieldValue('google_location', `${markerPosition.lat}, ${markerPosition.lng}`);
      setIsOpen(false);
    }
  }

  return (
    <TaskModal className='h-fit'>
      <TaskModalHeader>
        <div className="w-full">
          <span>Set Location</span>
        </div>
        <MyCloseIcon onClick={() => {
            setIsOpen(false);
  
        }} />
      </TaskModalHeader>
      <TaskModalContent className='h-full'>
        {isLoaded && markerPosition ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={markerPosition}
            zoom={12}
            onClick={handleMapClick}
          >
            <Marker position={markerPosition} />
          </GoogleMap>
        ) : (
          <div className='w-full flex items-center justify-center h-[400px]'>
              <CircularProgress color="inherit" />
          </div>
        )}
      </TaskModalContent>
      <TaskModalFooter className='mt-auto'>
        <AyButton title="Set This Location" onClick={() => {handleSaveGoogleLocation()}} />
      </TaskModalFooter>
    </TaskModal>
  );
}
