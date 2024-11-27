import { io } from "socket.io-client";

const API_KEY =
  "6af44b9120c716f3fe1faadcecbeb4e2a27fa4f6158e7ec942781573f807b64b";
const SOCKET_URL = `wss://streamer.cryptocompare.com/v2`;

const socket = io(SOCKET_URL, {
  autoConnect: false, // Chỉ kết nối khi cần
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

socket.auth = {
  api_key: API_KEY,
};

socket.on("connect", () => {
  console.log("Socket.IO connected");

  // Đăng ký các kênh WebSocket (có thể thay đổi tham số base và quote tùy theo yêu cầu)
});
socket.on("SubAdd", data => {
  // Xử lý dữ liệu nhận được từ sự kiện "SubAdd"
  console.log(data);
});
socket.emit(
  "SubAdd",
  {
    subs: [
      "5~CCCAGG~BTC~USD", // Aggregate Index for Bitcoin in USD
      "0~Coinbase~ETH~USD", // Coinbase ETH in USD
      "2~Binance~BTC~USDT", // Binance BTC in USDT
    ],
  },
  (response: string) => {
    const data = JSON.parse(response);
    // Optional: Handle the server's response after subscribing
    if (data?.TYPE === "24") console.log("Server response:", data);
  }
);
socket.on("disconnect", () => {
  console.log("Socket.IO disconnected");
});

socket.on("error", error => {
  console.error("Socket.IO error:", error);
});

socket.connect();

export default socket;
