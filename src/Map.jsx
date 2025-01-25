import React, { useEffect } from "react";
import useTrafficData from "./useGetTraffic.tsx";

import {lat, lng} from './dummy.js'

// interface MarkerData {
//   lat: number;
//   lng: number;
//   tm: number;
// }

const Map = ({value}) => {
  const { data } = useTrafficData();

  const getData = (t) => {
    const rand = () => {
      const times = [5, 10, 15];
      const randomIndex = Math.floor(Math.random() * times.length); 
      return times[randomIndex]
    }
    const data = Object.keys(lat).map(key => ({
        lat: lat[key],
        lng: lng[key],
        tm: rand()
      }));

      const result = data.reduce((acc, item, index) => {
        if (index % t === 0) {
          // value의 배수 인덱스일 경우 스킵
          return acc;
        }
        acc.push(item); // 조건에 맞는 경우만 추가
        return acc;
      }, []);

      return result
}


  useEffect(() => {
    const initMap = () => {
      if (!window.naver) {
        console.error("Naver Maps script not loaded!");
        return;
      }

      const map = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(37.498095, 127.02761), // 강남역 37.498095, 경도는 127.027610
        zoom: 14.5,
      });

      const addMarkers = (map, markerArray) => {
        markerArray.forEach(({ lat, lng, tm }) => {
          const position = new window.naver.maps.LatLng(lat, lng);

          const marker = new window.naver.maps.Marker({
            position,
            map,
            icon: {
              content: `<div style="
                background-color: white;
                border: 1px solid #ccc;
                border-radius: 5px;
                padding: 5px 10px;
                font-size: 14px;
                font-weight: bold;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              ">
                ${tm}분 뒤 막힘 ☠
              </div>`,
            },
          });

          // 마커 클릭 이벤트 추가
          window.naver.maps.Event.addListener(marker, "click", () => {
            map.setCenter(position);
            map.setZoom(16);
          });
        });
      };

      const dummy = getData(value)

      // 마커 데이터를 전달하여 함수 호출
      const markerData = [
        { lat: 37.4839213108069, lng: 127.03458664768, tm: 5 },
        {
          lat: 37.4853984528081,
          lng: 127.040411152608,
          tm: 5,
        },
        {
          lat: 37.4856138949331,
          lng: 127.045849445194,
          tm: 10,
        },
        {
          lat: 37.4856570993088,
          lng: 127.045974920003,
          tm: 5,
        },
        {
          lat: 37.485909309437,
          lng: 127.043381394049,
          tm: 15,
        },
      ];
      addMarkers(map, dummy);

      const trafficLayer = new window.naver.maps.TrafficLayer();
      trafficLayer.setMap(map);
    };

    if (window.naver) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src =
        "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=n5kchb8qxu";
      script.async = true;
      script.onload = () => initMap();
      document.body.appendChild(script);
    }
  }, [value]);

  return (
    <div>
      <div
        id="map"
        style={{
          width: "75%",
          height: "70vh",
          margin: "2rem auto",
          borderRadius: "10px",
        }}
      ></div>
    </div>
  );
};

export default Map;
