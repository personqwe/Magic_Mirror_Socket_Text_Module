var NodeHelper = require("node_helper");
const socketIO = require('socket.io');
var Text;
module.exports = NodeHelper.create({
    start: function () {
        this.config = {};

        // Express 앱 생성
        const app = this.expressApp;

        // Express 앱을 이용하여 HTTP 서버 생성
        const server = require('http').Server(app);

        // socket.io 인스턴스를 생성하고 서버에 바인딩
        const io = socketIO(server);

        const port = 3000; 
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

        io.on('connection', (socket) => {
            console.log('Client connected');

            socket.on('message', (obj) => {
                console.log('Server received data:', obj);
				Text = obj;
                this.sendSocketNotification("UPDATE_TEXT", obj); // Fixed this line
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === 'CONFIG') {
            this.sendSocketNotification('STARTED');
        }
		else if (notification === 'UPDATE_TEXT')
		{
            this.sendSocketNotification(Text);
		}
    }
});
