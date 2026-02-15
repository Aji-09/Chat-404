document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  socket.on("connect", (socket) => {
    const status = document.querySelector(".online-status");
    status.classList.add("is-online-status");
  });

  socket.on("disconnect", (socket) => {
    const status = document.querySelector(".online-status");
    status.classList.remove("is-online-status");
  });
  socket.on("message", (data) => {
    console.log(data);
    const messages = document.querySelector("#messages");
    const newMessage = document.createElement("li");

    newMessage.classList.add(data.id === socket.id ? "me" : "peer");

    newMessage.textContent = data.message;
    messages.appendChild(newMessage);

    messages.scrollTo({
      top: messages.scrollHeight,
      behavior: "smooth",
    });
  });

  document.querySelector("#chat-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const msg = document.querySelector("#msg");
    if (msg.value != "") {
      socket.send(msg.value);
    }
    msg.value = "";
  });
});
