import React from "react";
import Art from "./Art";
import art1 from "../assets/art1.jpg";

const Arts = () => {
  const arts = [
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
    {
      title: "example art",
      image: art1,
      description: "some things about this art here",
      artist: "Danny",
      price: "1000000",
    },
  ];
  return (
    <div className="py-3 sm:py-5 ">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {arts.map((art) => (
          <Art
            title={art.title}
            image={art.image}
            description={art.description}
            artist={art.artist}
            price={art.price}
          />
        ))}
      </div>
    </div>
  );
};
export default Arts;
