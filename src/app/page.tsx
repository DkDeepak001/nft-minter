"use client";
import { ethers } from "ethers";
import { ABI } from "./ABI";
import { Web3Storage } from "web3.storage";
import Image from "next/image";

export default function Home() {
  // @ts-ignore to fix web3Provider ts types
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, ABI, signer);

  const getClient = () => {
    return new Web3Storage({
      token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN || "",
    });
  };

  const handleUploadImage = async (e: any) => {
    const file = e.target.files[0];
    const res = await getClient().put([file]);
    console.log(res);
  };

  return (
    <div className="m-5 flex-col flex gap-2">
      <input type="file" onChange={handleUploadImage} />
      <Image
        src={`https://ipfs.io/ipfs/bafkreigvftj3lmwifwevmpblkw7lhf4qmybabsuofgnaer6rhi6zv5skry`}
        alt="Picture of the author"
        width={500}
        height={500}
      />
    </div>
  );
}
