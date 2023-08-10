Module.register("Socket-Text", {
    defaults: {
        text: "Hello World!",
        imageSrc: "image/music.png" // 이미지 파일을 모듈 디렉토리에 위치시킴
    },

    getDom: function() {
        var wrapper = document.createElement("div");

        var image = document.createElement("img");
        image.src = this.data.path + "/" + this.config.imageSrc; // 상대 경로 설정
        wrapper.appendChild(image);
    
        // 텍스트를 포함하는 div 영역 생성
        var textWrapper = document.createElement("div");
        textWrapper.innerHTML = this.config.text;
        wrapper.appendChild(textWrapper);
    
        return wrapper;
    },
    start: function() {
        this.sendSocketNotification('CONFIG', this.config);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'STARTED') {
            this.config.text = 'Started';
            this.updateDom();
        } else if (notification === 'UPDATE_TEXT') {
            this.config.text = payload;
            this.updateDom();
        }
    }
});
