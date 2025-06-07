"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar";
// Update the import path below to the correct location of Card and CardContent components.
// For example, if they are in a local 'components/ui/card' file:
import { Card, CardContent } from "../components/ui/card";
// Or, if the correct path is different, update accordingly.
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";



interface TestimonialsProps {
  darkMode: boolean;
}

// Testimonials Data
const testimonials = [
  {
    id: 1,
    name: "Priya S",
  
    content:
      "This app changed the way I understand my body. I no longer get surprised by mood swings or cramps, it’s like having a personal health assistant in my pocket!",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael john",
    content:
      "I started checking lili’s cycle in the app to be more supportive. It helped me become more patient and thoughtful during her PMS days. Every guy should try this!",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    content:
      "I have PCOS, and tracking my irregular cycles was a nightmare. This app gave me clarity and helped me communicate better with my doctor.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 4,
    name: "David Smith",
    content:
      "I always wanted to help my gf during her tough days, but didn’t know how. This app made it easier to understand what she’s going through—and that made all the difference.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    rating: 5,
  },
];


// Update component to accept darkMode prop
export function Testimonials({ darkMode }: TestimonialsProps) {
  return (
    <div className={`py-20 ${
      darkMode ? 'bg-[#020617] text-white' : 'bg-gradient-to-b from-pink-50 to-purple-40'
    }`} id="testimonials">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-4xl md:text-5xl font-bold mb-3 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            What Our Users Say
          </motion.h2>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-32 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6"
          ></motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-lg ${
              darkMode ? 'text-zinc-400' : 'text-gray-600'
            } max-w-2xl mx-auto`}
          >
            Join thousands of satisfied users who have found it helpful
          </motion.p>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6 py-4"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                duration: 50,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              },
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Card
                key={`${testimonial.id}-${index}`}
                className={`w-[350px] flex-shrink-0 border-none ${
                  darkMode 
                    ? 'bg-zinc-900 text-white' 
                    : 'bg-white bg-opacity-80 text-gray-900'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className={`font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {testimonial.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className={`${
                    darkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    {testimonial.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}