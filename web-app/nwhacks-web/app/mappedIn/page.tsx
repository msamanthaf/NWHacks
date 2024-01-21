"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  MappedinMap,
  TGetVenueMakerOptions,
  TMapViewOptions,
} from "@mappedin/mappedin-js";
import { TextField, Button } from "@mui/material";
import "@mappedin/mappedin-js/lib/mappedin.css";
import useMapChanged from "@/hooks/useMapChanged";
import useMapView from "@/hooks/useMapView";
import useVenueMaker from "@/hooks/useVenueMaker";
import "@/app/globals.css";
import getLocation from "../getLocation";
import MicIcon from "@mui/icons-material/Mic";

import Link from "next/link";

/* This demo shows you how to draw a path between two locations. */

export default function Map() {
  const [spokenText, setSpokenText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const startSpeechRecognition = () => {
    if ("webkitSpeechRecognition" in window) {
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
        console.error("Speech recognition error:", event.error);
      };

      recognition.start();
    } else {
      console.error("Speech recognition not supported in this browser");
    }
  };

  const credentials = useMemo<TGetVenueMakerOptions>(
    () => ({
      mapId: "65acc6a1ca641a9a1399dc75",
      key: "65ad46db83bd240b9aaf48bb",
      secret:
        "2eab22d952cdd43cf3edaa10bfa2fbd959508be823aabd8f491c006864b195e6",
    }),
    []
  );

  const venue = useVenueMaker(credentials);

  const mapOptions = useMemo<TMapViewOptions>(
    () => ({
      xRayPath: true,
      multiBufferRendering: true,
    }),
    []
  );

  const { elementRef, mapView } = useMapView(venue, mapOptions);
  const [selectedMap, setSelectedMap] = useState<MappedinMap | undefined>();

  useEffect(() => {
    if (!mapView || !venue) {
      return;
    }

    let locationArray: any = [];

    getLocation(spokenText).then((data) => {
      locationArray = data;

      const startLocation = venue.locations.find((location) =>
        location.id.includes(locationArray[0])
      );

      const endLocation = venue.locations.find((location) =>
        location.id.includes(locationArray[1])
      );

      if (startLocation && endLocation) {
        const directions = startLocation.directionsTo(endLocation);
        if (directions && directions.path.length > 0) {
          mapView.Journey.draw(directions, {
            polygonHighlightColor: "#e74c3c",
            departureMarkerTemplate: (props) => {
              return `<div style="display: flex; flex-direction: column; justify-items: center; align-items: center;">
                <div class="departure-marker">${
                  props.location ? props.location.name : "Departure"
                }</div>
                ${props.icon}
              </div>`;
            },
            destinationMarkerTemplate: (props) => {
              return `<div style="display: flex; flex-direction: column; justify-items: center; align-items: center;">
                <div class="destination-marker">${
                  props.location ? props.location.name : "Destination"
                }</div>
                ${props.icon}
              </div>`;
            },
            connectionTemplate: (props) => {
              return `<div class="connection-marker">Take ${props.type} ${props.icon}</div>`;
            },
            pathOptions: {
              nearRadius: 0.25,
              farRadius: 1,
              color: "#40A9FF",
              displayArrowsOnPath: false,
              showPulse: true,
              pulseIterations: Infinity,
            },
          });

          mapView.setMap(directions.path[0].map);
        }
      }

      setSelectedMap(mapView.currentMap);
    });
  }, [mapView, venue, spokenText]);

  /* Monitor floor level changes and update the UI */
  useMapChanged(mapView, (map) => {
    setSelectedMap(map);
  });

  return (
    <div id="app">
      {/* Header */}
      <div className="mt-12 px-6 justify-between flex flex-row">
        <p className="text-3xl font-semibold">Thirst Taps</p>
        {/* Profile */}
        <div className="justify-between flex flex-row gap-2">
          {/* Profile text */}
          <div className="text-right text-base">
            <p>Daniel</p>
            <Link href="/profile">
              <p className="font-extralight">View Profile</p>
            </Link>
          </div>
          <div className="h-12 w-12 bg-slate-300 rounded-full" />
        </div>
      </div>

      {/* Text */}
      <div className="mt-4 px-6 space-y-5 mb-4">
        <p className="text-xl font-medium">Talk your way</p>
        <TextField
          label="Tell the AI which venue is nearby and your destination"
          variant="outlined"
          value={spokenText}
          fullWidth
          onChange={(e) => setSpokenText(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={startSpeechRecognition}
          startIcon={<MicIcon />}
          disabled={isListening}
        >
          {isListening ? "Listening..." : "Start Listening"}
        </Button>
      </div>

      {/* selector */}
      <div id="ui">
        {venue?.venue.name ?? "Loading..."}
        {venue && selectedMap && (
          <>
            {/* Flooor */}
            <select
              value={selectedMap.id}
              onChange={(e) => {
                if (!mapView || !venue) {
                  return;
                }

                const floor = venue.maps.find(
                  (map) => map.id === e.target.value
                );
                if (floor) {
                  mapView.setMap(floor);
                }
              }}
            >
              {venue?.maps.map((level, index) => {
                return (
                  <option value={level.id} key={index}>
                    {level.name}
                  </option>
                );
              })}
            </select>
          </>
        )}
      </div>

      {/* Map */}
      <div id="map-container" ref={elementRef}></div>
      <Link
        href="/map"
        className="w-1/3 flex justify-start absolute bottom-16 right-4"
      >
        <div className="bg-[#0D1F40] w-[244px] h-[60px] rounded-lg text-white flex justify-center items-center font-semibold">
          Found it!
        </div>
      </Link>
    </div>
  );
}
