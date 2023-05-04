import React from "react";
import LikeButton from "./LikeButton";

const Art = ({ title, image, description, artist, artistId, artId, price }) => {
  return (
    <div className="">
      <div className="relative">
        <div className="grad absolute h-full w-full rounded-b-[1.3rem]"></div>
        <div className="flex">
          <img
            src={image}
            alt=""
            className="object-cover rounded-[1.3rem] sm:h-[16rem] md:h-[14rem] w-full"
          />
          <div className="absolute text-white font-bold bottom-2 left-4 text-[20px] flex items-center gap-2">
            {title}
          </div>
        </div>
      </div>
      <div className="pt-2 flex justify-between items-start">
        <div>
          <p className="max-w-[18rem] font-semibold text-[16px]">
            {description}, ID: {artId}
          </p>
          <p className="max-w-[18rem] text-[16px] -mt-1 text-gray-500">
            {artist}, Artist ID:{artistId}
          </p>
          <p className="max-w-[18rem] text-[16px]">${price}</p>
        </div>
        <div className="flex items-center space-x-1">
          <LikeButton artId={artId} artistId={artistId} title={title} />
          <p className="text-[14px]"></p>
        </div>
      </div>
    </div>
  );
};

export default Art;
