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
    var firestore = firebase.firestore();
  // Firebase 인증 상태 변화 감지
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // 로그인 상태
      var uid = user.uid;
      sessionStorage.setItem('uid', uid);
      console.log('UID:', uid);



    var userNameElement = document.getElementById('userName');
        var emailElement = document.getElementById('email');
        firestore.collection('users').doc(uid).get().then(function(doc) {
            var nickname = doc.data().nickname;
            var email = user.email;
            userNameElement.textContent = '이름: ' + nickname;
            emailElement.textContent = '아이디: ' + email;
        }).catch(function(error) {
            console.log('Error getting user document:', error);
        });






    } else {
      // 로그아웃 상태
      sessionStorage.removeItem('uid');
      console.log('로그아웃 상태');
      location.href = 'masterlogin.html';
    }
  });
