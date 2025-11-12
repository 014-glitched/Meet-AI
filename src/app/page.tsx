"use client";

import {useState} from "react";
import {Input} from "../components/ui/input";
import { Button } from "../components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { 
    data: session } = authClient.useSession() 

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password,
    },{
      onError: () => {
        window.alert("Error creating user")
      },
      onSuccess: () => {
        window.alert("User created successfully")
      }
    })  
  }

  if(session){
    return (
      <div className="flex flex-col gap-y-4 p-4">
        <p>{session.user.name} logged in successfully.</p>
        <Button onClick={() => authClient.signOut()}>
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Input
        placeholder="Enter your Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Enter your Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Enter your Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit}>
        Create User
      </Button>
    </div>
  );
}
