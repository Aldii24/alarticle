"use client";

import { cn } from "@/lib/utils";
import { Boxes } from "./ui/background-boxes";
import Image from "next/image";

const WhoIsSection = () => {
  return (
    <div className="h-[20rem] relative w-[90%] mx-auto my-16 overflow-hidden bg-slate-900 flex flex-col md:p-16 p-10 rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="md:flex md:flex-row flex flex-col items-center gap-10">
        <div className="flex flex-col gap-6">
          <h3 className="md:text-3xl text-xl font-semibold">
            Who is Alarticle
          </h3>
          <p className="text-sm text-muted-foreground">
            Alarticle is a blog website that focuses on technology and software
            development. It is a platform for developers to share their
            knowledge and experience with others.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <Image
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D"
            alt="tech"
            width={200}
            height={200}
            className="w-full h-[150px] rounded-xl object-cover"
          />
          <Image
            src="https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D"
            alt="tech"
            width={200}
            height={200}
            className="w-full h-[150px] rounded-xl object-cover"
          />
          <Image
            src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D"
            alt="tech"
            width={200}
            height={200}
            className="w-full h-[150px] rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default WhoIsSection;
