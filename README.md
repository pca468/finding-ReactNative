# 프로젝트 시작 전 읽어주세요

clone 명령어 ```gh repo clone SongMinQQ/Finding```

최초 clone시 ```npm install``` 명령어 실행해 주세요

작업중인 환경과 테스트할 기기와 같은 네트워크에 연결되어 있어야 합니다.

```npx expo start``` 명령어를 터미널에 치신 후 expo 앱에서 확인해 주세요

깃허브 초기 설정 방법(git bash)

1. ```git init```

2. ```git remote add origin https://github.com/SongMinQQ/Finding.git```

3. ```git branch [사용할 브랜치명]```

4. ```git checkout [브랜치명]``` 작업할 브랜치로 이동하는 명령어

깃에 작업물 push하는 방법

1. ```git commit -m "커밋 메세지"```

2. ```git push origin [브랜치명]```

만약 같은 네트워크에 연결되는 상황이 제한될 경우 해결 방법입니다.

1. ```npm install -g ngrok```

2. 새 터미널 or cmd 열기

3. ```ngrok http 8080```(포트번호는 마음대로 사용하셔도 됩니다.)

4. 작업중인 프로젝트 폴더로 이동

5. ```npx expo start --tunnel```

프로젝트 진행 시 사용할 이미지 파일은 img 폴더에 정리해 주세요
