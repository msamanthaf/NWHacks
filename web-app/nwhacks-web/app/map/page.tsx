"use client";
import React, { useState } from 'react';
import { TextField, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import MicIcon from '@mui/icons-material/Mic';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
import gmaps from './gmaps';

export default function Map() {
  const [spokenText, setSpokenText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');

  const handlePlaceSelect = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setSelectedPlace(place);
      setSpokenText(place.formatted_address);
	  setSelectedAddress(place.formatted_address);
    }
  };

  const startSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const spokenResult = event.results[0][0].transcript;
        setSpokenText(spokenResult);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognition.start();
    } else {
      console.error('Speech recognition not supported in this browser');
    }
  };

  const handleTyping = (event) => {
    setSpokenText(event.target.value);
	setSelectedAddress(event.target.value);
  };

  const isAddressValid = () => {
    return selectedPlace && selectedPlace.formatted_address.includes("2350 Health Sciences");
  };

  return (
    <LoadScript
      googleMapsApiKey={gmaps}
      libraries={['places']}
    >
      <div className="w-screen h-screen bg-[#FFFF] text-[#0D1F40] flex flex-col gap-[20px] px-[10%] justify-center">
        <div className="flex">
          <Image alt={"logo"} src={"/logo.png"} width={67} height={67} />
          <div className=" flex justify-center items-start flex-col ml-2">
            <div className=" font-semibold text-3xl">Thirst Taps</div>
          </div>
        </div>

        <div className=" text-base flex-col gap-[12]">
          <Autocomplete
            onLoad={(auto) => setAutocomplete(auto)}
            onPlaceChanged={handlePlaceSelect}
          >
            <TextField
              label="Type or Speak to Find Address"
              variant="outlined"
              value={spokenText}
              fullWidth
              onChange={handleTyping}
            />
          </Autocomplete>
          <Button
            variant="outlined"
            onClick={startSpeechRecognition}
            startIcon={<MicIcon />}
            disabled={isListening}
            className="mt-10"
          >
            {isListening ? 'Listening...' : 'Start Listening'}
          </Button>
        </div>
		{selectedPlace && (
          <GoogleMap
            mapContainerStyle={{ height: '400px', width: '100%' }}
            center={{ lat: selectedPlace.geometry.location.lat(), lng: selectedPlace.geometry.location.lng() }}
            zoom={15}
          >
            <Marker
              position={{ lat: selectedPlace.geometry.location.lat(), lng: selectedPlace.geometry.location.lng() }}
              title={selectedPlace.formatted_address}
            />
          </GoogleMap>
        )}
      
        <div className="flex justify-between">
          <Link href="/signup" className="w-1/3 flex justify-start">
            <div className="bg-[#0D1F40] w-[244px] h-[60px] rounded-lg text-white flex justify-center items-center font-semibold">
              Back
            </div>
          </Link>

		  <Link href={isAddressValid() ? "/login" : "#"}  className="w-1/3 flex justify-end">
            <div className={`bg-[#0D1F40] w-[244px] h-[60px] rounded-lg text-white flex justify-center items-center font-semibold ${isAddressValid() ? "" : "cursor-not-allowed opacity-50"}`}>
              Next
            </div>
          </Link>
        </div>
      </div>
    </LoadScript>
  );
}
