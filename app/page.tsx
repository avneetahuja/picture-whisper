"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Home() {
  const generateUploadUrl = useMutation(api.db.generateUploadUrl);
  const saveImage = useMutation(api.db.saveImage);
  const resQuery = useQuery(api.db.getResponse);
  // const [preview, setPreview] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const url = await generateUploadUrl();

    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": image!.type },
      body: image,
    });

    const { storageId } = await result.json();

    await saveImage({ prompt: prompt, image: storageId });

    setImage(null);
    imageRef.current!.value = "";
  }
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          ref={imageRef}
          onChange={(e) => setImage(e.target.files![0])}
          disabled={image !== null}
        />
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></input>
        <input type="submit" value={"Send"}></input>
      </form>
    </div>
  );
}
