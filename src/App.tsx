import React, { useState, useEffect } from "react";
import "./App.css";

import styled from "styled-components";

import { io, Socket } from "socket.io-client";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1d3557;
`;

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-family: "ThaleahFat";
  letter-spacing: 3px;
  color: #fca311;
  font-size: 4em;
  margin-bottom: 5px;
`;

const Input = styled.input`
  font-family: "ThaleahFat";
  font-size: 2em;
  color: #fca311;
  height: 40px;
  min-width: 700px;
  padding-left: 15px;
  padding-right: 15px;
  &:focus {
    outline: 4px solid #fca311;
  }
`;

const Button = styled.button`
  font-family: "ThaleahFat";
  font-size: 3em;
  position: relative;
  left: 215px;
  background-color: white;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 30px;
  color: #291f0e;
`;

function App() {
  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");
  const [server] = useState(
    "http://battleship.southeastasia.azurecontainer.io:3031"
  );
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    setSocket(io(server));
  }, [server]);

  const onRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  const onPassswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    if (socket) {
      socket.emit("reset", roomId, password);
      console.log(server, roomId, password);
    }
  };

  return (
    <Container>
      <FormControl>
        <Label htmlFor="roomid">RoomId: </Label>
        <Input
          type="text"
          id="roomid"
          onChange={onRoomIdChange}
          value={roomId}
        />
      </FormControl>
      <FormControl>
        <Label htmlFor="password">Password: </Label>
        <Input
          type="password"
          id="password"
          onChange={onPassswordChange}
          value={password}
        />
      </FormControl>
      <Button onClick={onSubmit}>Reset Server</Button>
    </Container>
  );
}

export default App;
