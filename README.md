## 프로젝트 정보

매직미러를 통해 다른 컴퓨터, 라즈베리파이, 혹은 TOPST보드와 통신하여 텍스트를 화면에 보여줄 수 있습니다.

## 프로젝트 배경

다른 정보들을 커스텀하여 실시간으로 가져올 수 있는 모듈을 직접 만들어 볼 수 없을까? 라는 생각에서 이 프로젝트가 시작되었습니다.

## 프로젝트 진행과정

nodejs를 통해 서버를 구동하고 클라이언트 측에서 Text 및 image를 소켓통신을 활용하여 서버에게 전송합니다. 이후 해당하는 메세지를 화면에 보여줍니다.

## 소프트웨어 기능 리스트

- socketio를 활용한 통신
- 디자인 css
- node.js를 활용한 서버
- Text 및 image를 화면에 실시간으로 보여주는 js파일

## 하드웨어 구성 리스트

- TOPOST 보드

1. 터미널을 열고 다음 명령을 입력하여 Node.js 설치 스크립트를 내려받습니다.
    
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
    ```
    
2. 다음 명령으로 Node.js를 설치합니다.
    
    ```bash
    sudo apt-get install -y nodejs
    ```
    
3. 설치가 완료되면 다음 명령으로 Node.js와 npm의 버전을 확인합니다.
    
    ```bash
    node -v
    npm -v
    ```
    

**Python-SocketIO 라이브러리 설치**:
Python에서 Socket.IO를 사용하기 위해 **`python-socketio`** 라이브러리를 설치해야 합니다. 터미널에서 다음 명령어를 사용하여 라이브러리를 설치하세요

```bash
pip install python-socketio
```

- http통신을 위한 requests를 설치하십시오

```bash
pip install requests
```


Config 구성

```jsx
{
			module: "Socket-Text",
			position: "top_center",
			config: {
				Text : 'hello world'
			}
		},
```

socket.py파일을 해당하는 주소로 수정해야 합니다.

```python
import socketio

sio = socketio.Client()

@sio.event
def connect():
    print('서버에 연결되었습니다.')

@sio.event
def disconnect():
    print('서버와 연결이 끊어졌습니다.')

sio.connect('http://##############:3000')  # MagicMirror 서버의 IP 주소로 변경

while True:
    data = input('MagicMirror로 보낼 데이터 입력: ')
    sio.emit('message', data)  # 문자열 데이터를 서버로 전송
```

