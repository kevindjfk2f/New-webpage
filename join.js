// Firebase 초기화 (중복 선언 방지)
const firebaseConfig = {
  apiKey: "AIzaSyCN3O66LzTSkP49iLxQaRYQGJYPGPttReU",
  authDomain: "web-project-planify.firebaseapp.com",
  projectId: "web-project-planify",
  storageBucket: "web-project-planify.firebasestorage.app",
  messagingSenderId: "97117691884",
  appId: "1:97117691884:web:92c58cc40df3aba17e6ac9",
  measurementId: "G-BHGJ3YWP1Z"
};

    firebase.initializeApp(firebaseConfig);
    
  

    // 이메일 중복 체크 함수
  function checkEmailDuplication(email) {
      return firebase.firestore().collection('users')
        .where('email', '==', email)
        .get()
        .then(function(querySnapshot) {
          if (querySnapshot.size > 0) {
            return true; // 중복된 이메일이 있음
          } else {
            return false; // 중복된 이메일이 없음
          }
        })
        .catch(function(error) {
          console.error('이메일 중복 체크 중 오류 발생:', error);
          return false;
        });
    }
    
    // 닉네임 중복 체크 함수
    function checkNicknameDuplication(nickname) {
      return firebase.firestore().collection('users')
        .where('nickname', '==', nickname)
        .get()
        .then(function(querySnapshot) {
          if (querySnapshot.size > 0) {
            return true; // 중복된 닉네임이 있음
          } else {
            return false; // 중복된 닉네임이 없음
          }
        })
        .catch(function(error) {
          console.error('닉네임 중복 체크 중 오류 발생:', error);
          return false;
        });
    }
    
    // 회원가입 이벤트 처리
  function handleSignUp(event) {
    event.preventDefault();
  
    // Disable the signup button after the first click
    var signupButton = event.target.querySelector('button[type="submit"]');
    signupButton.disabled = true;
  
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    var nickname = document.getElementById('nickname').value;
  
    // 비밀번호 길이 및 형식 확인
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('비밀번호는 최소한 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 혼합하여 사용해야 합니다.');
      signupButton.disabled = false; // Re-enable button if there's an error
      return;
    }
  
    // 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      signupButton.disabled = false; // Re-enable button if there's an error
      return;
    }
  
    // 이메일 중복 체크
    checkEmailDuplication(email)
      .then(function(isEmailDuplicated) {
        if (isEmailDuplicated) {
          alert('중복된 이메일입니다.');
          signupButton.disabled = false; // Re-enable button if there's an error
          return;
        }
  
        // 닉네임 중복 체크
        checkNicknameDuplication(nickname)
          .then(function(isNicknameDuplicated) {
            if (isNicknameDuplicated) {
              alert('중복된 닉네임입니다.');
              signupButton.disabled = false; // Re-enable button if there's an error
              return;
            }
  
            // Firebase 인증 생성 및 회원가입
            firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(function(userCredential) {
                var user = userCredential.user;
  
                // Firestore에 추가 정보 저장 등 추가 작업 수행
                firebase.firestore().collection('users').doc(user.uid).set({
                  email: email,
                  nickname: nickname
                }).then(function() {
                  alert('회원가입 완료!');
                  location.href = 'login.html';
                }).catch(function(error) {
                  alert('회원가입 실패!');
                  signupButton.disabled = false; // Re-enable button if there's an error
                });
              })
              .catch(function(error) {
                alert('회원가입 중 오류 발생!');
                signupButton.disabled = false; // Re-enable button if there's an error
              });
          });
      });
  }
  
    
    
    // 이벤트 리스너 등록
    var form = document.getElementById('signup-form');
    form.addEventListener('submit', handleSignUp);
  