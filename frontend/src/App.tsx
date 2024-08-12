import { useState, useEffect } from "react";
import { http } from "./utils/axios.ts";
import "./App.css";

import Footer from "./layouts/Footer";
import { Skeleton, SkeletonText } from "@chakra-ui/react";

function App() {
      const [image, setImage] = useState("");
      const [text, setText] = useState("");

      useEffect(() => {
            const generateImage = async () => {
                  try {
                        const resText = await http.post("http://localhost:8080/get-text", {
                              prompt: `Write a brief and inviting introduction for a children's story website. In just a few lines, capture the excitement of exploring magical worlds, meeting new characters, and diving into interactive adventures. The tone should be warm, engaging, and full of wonder, perfect for a landing page.
                              )}}`,
                        });
                        console.log(resText.data.result);
                        setText(resText.data.result);

                        const resImg = await http.post("http://localhost:8080/get-image", {
                              prompt: `Create a colorful and imaginative drawing of a magical forest where friendly animals live and adventure awaits. Include whimsical elements like talking trees, glowing flowers, and playful creatures to spark children's imaginations and complement a fun and engaging story. #${Math.floor(
                                    Math.random() * 10000
                              )}`,
                        });

                        const data = resImg.data;

                        if (data.image) {
                              setImage(data.image); // Store the Base64 string
                        } else {
                              console.error(
                                    "Failed to generate image: Image field is missing in response."
                              );
                        }
                  } catch (error) {
                        console.error("Error fetching the image:", error.message);
                  }
            };

            // Trigger the image generation on component load
            generateImage();
      }, []); // Empty dependency array ensures this runs once on component mount

      return (
            <div className="w-full">
                  <div className="flex justify-center items-center h-screen w-full">
                        <div className="flex flex-col items-center gap-y-10">
                              <div className="text-center">
                                    <h1 className="font-bold text-5xl mb-5">Golpo</h1>
                                    <p>
                                          AI takes the lead, your decisions dance, and the narrative
                                          comes to life.
                                          <br /> Every choice you make creates a new theme in this
                                          realm of words and dreams.
                                    </p>
                              </div>
                              <div className="flex flex-shrink justify-center items-center w-full">
                                    {image ? (
                                          <img
                                                className="transition"
                                                src={image}
                                                height="500"
                                                width="500"
                                                alt="Generated"
                                          />
                                    ) : (
                                          <Skeleton className="h-[500px] w-[500px]" />
                                    )}
                                    {text ? (
                                          <p className="font-medium text-lg text-center w-1/3 p-4">
                                                {text}
                                          </p>
                                    ) : (
                                          <SkeletonText
                                                className="p-4"
                                                noOfLines={4}
                                                spacing="4"
                                                skeletonHeight="2"
                                          />
                                    )}
                              </div>
                              <form className="w-full max-w-xs">
                                    <div className="mb-4">
                                          <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="name"
                                          >
                                                Enter your name to start your story.
                                          </label>
                                          <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                type="text"
                                                placeholder="Enter your name"
                                                required
                                          />
                                    </div>
                                    <div className="flex items-center justify-center">
                                          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                                Begin
                                          </button>
                                    </div>
                              </form>
                        </div>
                  </div>
                  <Footer />
            </div>
      );
}

export default App;
