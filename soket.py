import socketio
import json

sio = socketio.Client()
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
