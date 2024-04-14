"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import Image from "next/image";
import { Avatar,AvatarImage,AvatarFallback } from "@/components/ui/avatar";

export default function Home() {
  const [preview, setPreview] = useState("");
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {/* <Avatar className="w-24 h-24">
            <AvatarImage src={preview} />
            <AvatarFallback>BU</AvatarFallback>
          </Avatar> */}
          <Image src={preview? preview : ""} alt="icon" width={500} height={200} className="rounded-full"/>
      <Label htmlFor="image"></Label>
      <Input
        id="image"
        type="file"
        onChange={(event) => {
          const dataTransfer = new DataTransfer();
          Array.from(event.target.files!).forEach((image) =>
            dataTransfer.items.add(image)
          );
          const files = dataTransfer.files;
          const displayUrl = URL.createObjectURL(event.target.files![0]);
          setPreview(displayUrl);
          // onChange(files);
        }}
      ></Input>
      
    </div>
  );
}
