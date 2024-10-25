"use client";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Polyline } from "react-leaflet/Polyline";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

import { ToastContainer, toast } from 'react-toastify';
import { useMapEvents } from "react-leaflet";

export default function MapView({
  _polyline,
  salesperson_id,
}: {
  _polyline: number[][];
  salesperson_id: string;
}) {
  const [polyline, setPolyLine] = useState<LatLng[]>([]);
  const client = createClient();  

  useEffect(() => {
    const t1 = client
      .channel("room1")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "location_tracker" },
        (payload) => {
          if (payload.new.salesperson_id == salesperson_id)
            console.log("Change received!", [payload.new.lat, payload.new.long]);
            setPolyLine((old) => {
              const updatedPolyLine = [
                ...old,
                new LatLng(payload.new.lat as number, payload.new.long as number),
              ];
              return updatedPolyLine;
            });
        },
      )
      .subscribe();
    console.log("Location Updated", t1);
  }, []);
  if (_polyline.length == 0) return <>No Location Data Store </>;

  let meanLat = 0;
  let meanLong = 0;
 
  for (const coordinate of _polyline) {
    meanLat += coordinate[0];
    meanLong += coordinate[1];

    polyline.push(new LatLng(coordinate[0], coordinate[1]));
  }


  meanLat = meanLat / _polyline.length;
  meanLong = meanLong / _polyline.length;

  const limeOptions = { color: "lime" };

  return (
    <>
      <MapContainer
        className="h-[80vh] w-full relative"
        center={new LatLng(meanLat, meanLong)}
        zoom={17}
        
      >
        <TileLayer
          attribution="Made by Team Mission_I_M_Possible"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline pathOptions={limeOptions} positions={polyline} />
        <CustomMapComponent />
      </MapContainer>
    </>
  );
}

function CustomMapComponent(){
  useMapEvents({
    click: async (e) => {
      console.log("Map Clicked",e)
      toast.info(`Lat, Long of current location is: ${e.latlng.lat}, ${e.latlng.lng}`)
      await navigator.clipboard.writeText(`${e.latlng.lat}, ${e.latlng.lng}`)
    },
    locationfound: (location) => {
      console.log('location found:', location)
    },
  })
  return (
    <>
      <ToastContainer />
    </>
  )
}