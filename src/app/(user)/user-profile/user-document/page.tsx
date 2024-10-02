"use client";

import React, { useEffect } from "react";

export default function UserDocumentScreen() {
  useEffect(() => {
    // Ensure this code runs only on the client-side
    const obj = document.querySelector("#gallery");
    const time = 10000;

    function animStart() {
      if (obj?.classList.contains("active") === false) {
        obj?.classList.add("active");
        setTimeout(() => {
          animEnd();
        }, time);
      }
    }

    function animEnd() {
      obj?.classList.remove("active");
      (obj as HTMLElement).offsetWidth; // Trigger reflow
    }

    // Add event listeners for scroll and resize
    const handleScroll = () => animStart();
    document.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", animStart);

    // Run the animation on load
    animStart();

    // Cleanup event listeners when component unmounts
    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", animStart);
    };
  }, []);

  return (
    <section className="w-full flex flex-col bg-line-10 rounded-lg shadow-md p-4 mb-16">
      <div className="flex flex-col h-full items-center w-full gap-y-6">
        <div id="gallery">
          <figure>
            <img
              src="https://images.unsplash.com/photo-1610042560883-3cab6606b805?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODczNDB8&ixlib=rb-4.0.3&q=100&w=500"
              alt="Pink and blue clouds at sunset. "
              title="Photo by Jeremy Doddridge for Unsplash"
            />
            <figcaption>8 PM, Summer</figcaption>
          </figure>

          <figure>
            <img
              src="https://images.unsplash.com/photo-1610042560883-3cab6606b805?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODczNDB8&ixlib=rb-4.0.3&q=100&w=500"
              alt="Pink and blue clouds at sunset. "
              title="Photo by Jeremy Doddridge for Unsplash"
            />
            <figcaption>8 PM, Summer</figcaption>
          </figure>

          <figure>
            <img
              src="https://images.unsplash.com/photo-1610042560883-3cab6606b805?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODczNDB8&ixlib=rb-4.0.3&q=100&w=500"
              alt="Pink and blue clouds at sunset. "
              title="Photo by Jeremy Doddridge for Unsplash"
            />
            <figcaption>8 PM, Summer</figcaption>
          </figure>

          <figure>
            <img
              src="https://images.unsplash.com/photo-1610042560883-3cab6606b805?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODczNDB8&ixlib=rb-4.0.3&q=100&w=500"
              alt="Pink and blue clouds at sunset. "
              title="Photo by Jeremy Doddridge for Unsplash"
            />
            <figcaption>8 PM, Summer</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
