"use client";
import { ethers } from "ethers";
import { useState } from "react";

export default function Home() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const ABI = [
    "constructor()",
    "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
    "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
    "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
    "function approve(address to, uint256 tokenId)",
    "function balanceOf(address owner) view returns (uint256)",
    "function getApproved(uint256 tokenId) view returns (address)",
    "function getToken(uint256 id) view returns (string)",
    "function isApprovedForAll(address owner, address operator) view returns (bool)",
    "function mintToken(address to, string tokenURI) returns (uint256)",
    "function name() view returns (string)",
    "function ownerOf(uint256 tokenId) view returns (address)",
    "function safeTransferFrom(address from, address to, uint256 tokenId)",
    "function safeTransferFrom(address from, address to, uint256 tokenId, bytes data)",
    "function setApprovalForAll(address operator, bool approved)",
    "function supportsInterface(bytes4 interfaceId) view returns (bool)",
    "function symbol() view returns (string)",
    "function tokenURI(uint256 tokenId) view returns (string)",
    "function transferFrom(address from, address to, uint256 tokenId)",
  ];

  const address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, ABI, signer);

  const [value, setValue] = useState("");

  const handleMint = async () => {
    const tx = await contract.mintToken(
      value,
      "https://bafkreigvftj3lmwifwevmpblkw7lhf4qmybabsuofgnaer6rhi6zv5skry.ipfs.nftstorage.link/"
    );
    await tx.wait();
  };

  const getId = async () => {
    const id = await contract.balanceOf(value);
    //convert id to string
    console.log(id.toString());
  };

  const getToken = async () => {
    const token = await contract.getToken(0);
    console.log(token);
  };

  return (
    <div className="m-5 flex-col flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border-2 border-gray-300"
      />
      <button
        onClick={handleMint}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Mint
      </button>
      <button
        onClick={getId}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get ID
      </button>
      <button
        onClick={getToken}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get Token
      </button>
    </div>
  );
}
