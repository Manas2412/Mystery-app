"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import messages from "@/messages.json"

const Home = () => {
  return (
    <section className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-900 text-white">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Dive into the World of Anonymous Feedback
        </h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-400">
          True Feedback — where your identity remains a mystery.
        </p>
      </div>

      {/* Carousel for Messages */}
      <Carousel
        plugins={[Autoplay({ delay: 3000 })]}
        className="w-full max-w-xs md:max-w-xl"
      >
        <CarouselContent>
          {messages.map((message, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="flex aspect-square items-center justify-center p-6 flex-col space-y-4 text-center md:aspect-auto md:h-64">
                    <h2 className="text-xl font-semibold text-white">{message.title}</h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      &quot;{message.content}&quot;
                    </p>
                    <p className="text-sm text-gray-500 italic">
                      Received {message.received}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex border-gray-700 bg-gray-800 hover:bg-gray-700 text-white" />
        <CarouselNext className="hidden md:flex border-gray-700 bg-gray-800 hover:bg-gray-700 text-white" />
      </Carousel>
    </section>
  );
};

export default Home;