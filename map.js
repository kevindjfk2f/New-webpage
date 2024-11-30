

// Initialize and add the map
let map;

async function initMap() {
  const position = { lat: 35.1795543, lng: 129.0756416 }; // Example: Busan
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Busan",
  });

  map.addListener("click", (event) => {
    const clickedLatLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    // Save the latitude and longitude to local storage
    localStorage.setItem("clickedLocation", JSON.stringify(clickedLatLng));
    console.log("Location saved to local storage:", clickedLatLng);

    // Send location data to AI
    sendLocationToAI(clickedLatLng);

    // Show the 'next' button
    document.getElementById('next-button').style.display = 'block';
  });
}

// Function to send location data to AI
function sendLocationToAI(location) {
  console.log("Sending location data to AI:", location);
  // Add your AI API call logic here
  // Example:
  // fetch('AI_API_URL', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ location: location }),
  // }).then(response => response.json())
  //   .then(data => console.log('Location data sent successfully:', data))
  //   .catch(error => console.error('Error sending location data:', error));
}

// 초기 상태에서 '다음으로 이동' 버튼 숨기기
document.getElementById('next-button').style.display = 'none';

initMap();

// '다음으로 이동' 버튼 클릭 이벤트
document.getElementById('next-button').addEventListener('click', function() {
  // Navigate to the second screen (travel info input screen)
  window.location.href = 'main-info.html';
});

function navigateToPage2() {
  window.location.href = 'main-map.html'; // 클릭 시 main-map.html로 이동
}

function navigateToPage1() {
  window.location.href = 'mypage.html'; // 클릭 시 main-map.html로 이동
}

 // Firebase 인증 상태 변화 감지
 firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // 로그인 상태
    var uid = user.uid;
    sessionStorage.setItem('uid', uid);
    console.log('UID:', uid);










  } else {
    // 로그아웃 상태
    sessionStorage.removeItem('uid');
    console.log('로그아웃 상태');
    location.href = 'masterlogin.html';
  }
});
