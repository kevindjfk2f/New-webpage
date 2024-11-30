// Firebase 초기화
const firebaseConfig = {
  apiKey: "AIzaSyCN3O66LzTSkP49iLxQaRYQGJYPGPttReU",
  authDomain: "web-project-planify.firebaseapp.com",
  projectId: "web-project-planify",
  storageBucket: "web-project-planify.firebasestorage.app",
  messagingSenderId: "97117691884",
  appId: "1:97117691884:web:92c58cc40df3aba17e6ac9",
  measurementId: "G-BHGJ3YWP1Z",
};

firebase.initializeApp(firebaseConfig);

// 로그인 이벤트 처리
function handleLogin(event) {
  event.preventDefault();

  // 로딩 스피너 표시
  const spinner = document.getElementById("loginloadbox");
  spinner.style.display = "block";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Firebase 인증 로그인
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Firestore에서 사용자 정보 가져오기
      return firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();

            // 세션 스토리지에 사용자 정보 저장
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("uid", user.uid);
            sessionStorage.setItem("nickname", userData.nickname);

            console.log("로그인 성공: ", userData.nickname);

            // 페이지 이동
            location.href = "main-map.html";
          } else {
            throw new Error("사용자 데이터를 찾을 수 없습니다.");
          }
        });
    })
    .catch((error) => {
      console.error("로그인 오류 발생: ", error);

      // 오류 메시지를 표시
      const errorBox = document.getElementById("error-message");
      errorBox.style.display = "block";

      const errorMessage =
        error.code === "auth/user-not-found"
          ? "등록되지 않은 사용자입니다."
          : error.code === "auth/wrong-password"
          ? "비밀번호가 올바르지 않습니다."
          : "로그인 중 문제가 발생했습니다.";

      errorBox.textContent = errorMessage;
    })
    .finally(() => {
      // 로딩 스피너 숨기기
      spinner.style.display = "none";
    });
}

// 다크 모드 전환 기능
const toggleTheme = () => {
  const isDarkMode = document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");

  // 버튼 텍스트 업데이트
  const themeToggleButton = document.getElementById("theme-toggle");
  themeToggleButton.textContent = isDarkMode
    ? "Switch to Light Mode"
    : "Switch to Dark Mode";
};

// 초기 다크 모드 상태 로드
window.addEventListener("DOMContentLoaded", () => {
  // 다크 모드 상태를 로드하여 적용
  const themeToggleButton = document.getElementById("theme-toggle");
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
    themeToggleButton.textContent = "Switch to Light Mode";
  }

  // 로그인 이벤트 리스너 등록
  const form = document.getElementById("login-form");
  form.addEventListener("submit", handleLogin);

  // 다크 모드 토글 버튼 이벤트 리스너 등록
  themeToggleButton.addEventListener("click", toggleTheme);
});
