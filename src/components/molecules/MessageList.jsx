import React, { useState, useEffect, useRef } from "react";
import Avatar from "../atoms/Avatar/Avatar";
import ButtonSend from "../atoms/Button/ButtonSend";
import { useDispatch, useSelector } from "react-redux";
import {
  createMessage,
  fetchMessages,
  fetchMessage,
  updateMessage,
  fetchUser,
  fetchUsers,
  delMessage,
  clearMessage,
  fetchGroups,
} from "../../store/actions/user";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ButtonDel from "../atoms/Button/ButtonDel";
import ButtonEdit from "../atoms/Button/ButtonEdit";

function Message({ children }) {
  return (
    <div className="px-5 py-3 mt-2 mb-2 w-[350px] text-sm font-light tracking-wider text-white bg-gray-900 rounded-3xl">
      {children}
    </div>
  );
}

function ChatBubble({ index, children, src }) {
  return (
    <div key={index}>
      <section className="flex gap-5 justify-between items-start pt-3 pl-3.5 mt-2 mb-2 text-sm font-light tracking-wider text-white bg-gray-700 rounded-3xl">
        <div className="self-start w-full">{children}</div>
        <img
          loading="lazy"
          src={src}
          alt=""
          className="z-10 shrink-0 self-end mt-3.5 w-6 shadow-lg aspect-square rounded-full"
        />
      </section>
    </div>
  );
}

const MessageList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesContainer = useRef(null);

  const initialState = {
    id: "",
    body: "",
    created_at: "",
    email: "",
    image: "",
    name: "",
    updated_at: "",
    user_created: "",
    group_id: "", // Menambahkan group_id ke initialState
  };

  const { messages, messageBy, user, users, groups } = useSelector(
    (state) => state.userReducer
  );
  const [stateMessages, setStateMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [idDel, setIdDel] = useState(null);
  const [form, setForm] = useState(initialState);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const localStorageRes = JSON.parse(localStorage.getItem("profile"));
  const chatroomStorage = JSON.parse(localStorage.getItem("chatroom"));

  useEffect(() => {
    const ws = new WebSocket(`http://localhost:3001/cable`);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            channel: "MessagesChannel",
          }),
        })
      );
    };
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (
        data.type === "ping" ||
        data.type === "welcome" ||
        data.type === "confirm_subscription"
      )
        return;
      const message = data.message;
      if (message) {
        dispatch(fetchMessages())
          .then((res) => setStateMessages(res))
          .catch((err) => console.log("err", err));
      }
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMessages())
      .then((res) => setStateMessages(res))
      .catch((err) => console.log("err", err));
    dispatch(fetchGroups());
    dispatch(fetchUsers());
    dispatch(fetchUser(localStorageRes?.id));
  }, [dispatch]);

  useEffect(() => {
    setForm({ ...messageBy, group_id: selectedGroup?.id });
  }, [messageBy, selectedGroup]);

  const handleFetchMessage = (id) => {
    dispatch(fetchMessage(id))
      .then((res) => setForm(res))
      .catch((err) => console.log(err));
    setOpen(true);
  };

  useEffect(() => {
    if (messagesContainer.current)
      messagesContainer.current.scrollTop =
        messagesContainer.current.scrollHeight;
  }, [messages]);

  const handleClose = () => {
    setOpenDel(false);
    setOpen(false);
  };

  const deleteModalPrompt = (id) => {
    setOpenDel(true);
    setIdDel(id);
  };
  const handleDelete = (idDel) => {
    dispatch(delMessage(idDel));
    dispatch(clearMessage());
    handleClose();
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.body.value = "";
    const payload = {
      body: form.body,
      name: localStorageRes.name,
      email: localStorageRes.email,
      image: localStorageRes.image,
      user_created: localStorageRes.id,
      group_id: selectedGroup?.id,
    };
    if (!form.id) {
      dispatch(createMessage(payload));
      setForm(initialState);
    } else {
      dispatch(updateMessage(form.id, payload));
      setForm(initialState);
      handleClose();
    }
  };

  const sendMessage = () => {
    setOpen(true);
  };

  const onSelectGroup = (group) => {
    setSelectedGroup(group);
  };
  console.log("groups", groups);
  console.log("selectedGroup", selectedGroup);

  const logout = async () => {
    localStorage.clear();
    navigate("/auth");
  };

  if (!localStorageRes)
    return (
      <div className="flex items-center justify-center mt-40">
        <a
          href="/auth"
          className="bg-blue-500 text-white py-2 px-4 rounded-full flex items-center"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2430b4fcf89534bd731d7ae22ce329191f5ae73d2cf88492ac0df499895055c?apiKey=3e8d7fdb86a04f0f8471ea107a1f56cc&"
            alt="Choose user"
            className="mr-2"
          />
          Choose user please
        </a>
      </div>
    );

  if (!chatroomStorage)
    return (
      <div className="flex items-center justify-center mt-40">
        <a
          href="/group"
          className="bg-blue-500 text-white py-2 px-4 rounded-full flex items-center"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2430b4fcf89534bd731d7ae22ce329191f5ae73d2cf88492ac0df499895055c?apiKey=3e8d7fdb86a04f0f8471ea107a1f56cc&"
            alt="Choose user"
            className="mr-2"
          />
          Choose chatroom please
        </a>
      </div>
    );

  return (
    <section className="flex flex-col py-14 mt-4 mx-auto w-full shadow-2xl bg-slate-800 max-w-[500px] rounded-[40px]">
      <header className="flex flex-col px-9 w-full">
        <p className="text-white cursor-pointer" onClick={logout}>
          Logout
        </p>
        <div className="flex gap-5 justify-between px-0.5 w-full">
          <div className="flex gap-2.5">
            {users.map((user, index) => {
              return (
                <Avatar index={index + 1} src={`./images/${user.image}`} />
              );
            })}
            <div>
              <h2 className="text-white ">Group Chat</h2>
              <ul>
                {groups?.map((group) => (
                  <li key={group.id} onClick={() => onSelectGroup(group)}>
                    <p className="text-white ">{group.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>
      <main
        className="flex flex-col w-full px-9 mt-5 h-[400px] overflow-y-auto"
        ref={messagesContainer}
      >
        {stateMessages?.map((message, index) =>
          Number(message.user_created) !== user.id ? (
            <ChatBubble key={index} src={`./images/${message?.image}`}>
              <p className="text-left w-full font-bold">{message.name}</p>
              <p className="self-start w-[244px]">{message.body}</p>
              <time className="block mt-2 text-xs tracking-wider text-right text-white capitalize">
                {moment(message.created_at).format("HH:mm")}
              </time>
            </ChatBubble>
          ) : (
            <div className="flex justify-end" key={index}>
              <Message>
                <div className="text-right">{message.body}</div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <ButtonEdit
                      onClick={() => handleFetchMessage(message.id)}
                    />
                    <ButtonDel onClick={() => deleteModalPrompt(message.id)} />
                  </div>
                  <time className="block mt-2 text-xs tracking-wider text-right text-white capitalize">
                    {moment(message.created_at).format("HH:mm")}
                  </time>
                </div>
              </Message>
            </div>
          )
        )}
      </main>

      <form
        className="flex gap-4 self-center mt-10 text-sm tracking-wider whitespace-nowrap text-white text-opacity-60"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-auto w-[400px] gap-5 justify-between pl-4 rounded-xl bg-black bg-opacity-30">
          <input
            id="messageInput"
            type="text"
            name="body"
            autoComplete="off"
            onChange={onChange}
            required
            className="w-full p-2 bg-transparent"
            placeholder="Write"
            aria-label="Write"
            autoFocus={true}
          />
          <button type="submit">
            <ButtonSend src="https://cdn.builder.io/api/v1/image/assets/TEMP/96575a3d39217718f104d2824cce83a20a5a5f5a80ef9275b3c744251a015992?apiKey=3e8d7fdb86a04f0f8471ea107a1f56cc&" />
          </button>
        </div>
      </form>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <p
                onClick={handleClose}
                className="text-white text-right cursor-pointer"
              >
                x
              </p>
              <div className="flex items-center mb-4">
                <Avatar src={`./images/${localStorageRes.image}`} />
                <span className="ml-4 text-white">{localStorageRes.name}</span>
              </div>
              <div className="flex flex-auto gap-5 justify-between pl-4 rounded-xl bg-black bg-opacity-30">
                <input
                  type="text"
                  name="body"
                  onChange={onChange}
                  value={form?.body}
                  required
                  className="w-full p-2 bg-gray-900 text-white rounded-lg"
                  placeholder="Edit message"
                />
                <button type="submit">
                  <ButtonSend
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/96575a3d39217718f104d2824cce83a20a5a5f5a80ef9275b3c744251a015992?apiKey=3e8d7fdb86a04f0f8471ea107a1f56cc&"
                    onClick={sendMessage}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {openDel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <span className="ml-4 text-white">Yakin hapus pesan ini ?</span>
            </div>
            <p
              onClick={handleClose}
              className="text-white text-right cursor-pointer"
            >
              No
            </p>
            <p
              onClick={() => handleDelete(idDel)}
              className="text-white text-right cursor-pointer"
            >
              Yes
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default MessageList;
