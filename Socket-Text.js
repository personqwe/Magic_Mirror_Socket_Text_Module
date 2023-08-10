Module.register("Socket-Text", {
    defaults: {
        text: "Hello World!",
    },

    getDom: function() {
        var wrapper = document.createElement("div");
    
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
