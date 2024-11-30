// 폼 제출 시, 로컬 스토리지에 저장된 위치와 입력된 정보 AI로 전송
document.querySelector('input').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = {
      numPeople: document.querySelector('input[placeholder="여행 인원을 적어주세요"]').value,
      budget: document.querySelector('input[placeholder="예상 경비를 적어주세요"]').value,
      startDate: document.querySelector('input[placeholder="출발 날짜"]').value,
      endDate: document.querySelector('input[placeholder="도착 날짜"]').value,
      preference: document.querySelector('input[placeholder="선호 유형"]').value,
    };

  
    // 로컬 스토리지에 저장된 위치 가져오기
    const selectedLocation = JSON.parse(localStorage.getItem('clickedLocation')) || {};
  
    if (!selectedLocation.lat || !formData.numPeople || !formData.budget || !formData.startDate || !formData.endDate || !formData.preference) {
      alert("모든 필드를 입력하고 위치를 선택하세요.");
      return;
    }
  
    // AI로 전송할 데이터 구성
    const dataToSend = {
      ...formData,
      location: selectedLocation
    };
  
    console.log("전송할 데이터:", dataToSend);
  
    // AI API로 데이터 전송
    // fetch('AI_API_URL', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(dataToSend),
    // }).then(response => response.json())
    //   .then(data => console.log('Travel plan created:', data))
    //   .catch(error => console.error('Error:', error));
  });
  