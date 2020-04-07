import "./styles.css";

import { Chatroom } from "./chat";

import { ChatUI } from "./ui";

//dom query
const chatlist = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMessage = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");

//add new chat
newChatForm.addEventListener("submit", event => {
  event.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => {
      newChatForm.reset();
    })
    .catch(err => {
      console.log(err);
    });
});

//add new name
newNameForm.addEventListener("submit", event => {
  event.preventDefault();

  //update name via the chatroom
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);

  //reset the form
  newNameForm.reset();

  //show and hide the update message
  updateMessage.innerText = `your name was updated to ${newName}`;
  setTimeout(() => {
    updateMessage.innerText = "";
  }, 3000);
});

//update the chatroom
rooms.addEventListener("click", event => {
  if (event.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(event.target.getAttribute("id"));
    chatroom.getChats(chat => {
      chatUI.render(chat);
    });
  }
});

//check local storage for a name
const username = localStorage.username ? localStorage.username : "Anonymous";

//class instances
const chatUI = new ChatUI(chatlist);
const chatroom = new Chatroom("general", username);

//get chats and render
chatroom.getChats(data => {
  chatUI.render(data);
});
