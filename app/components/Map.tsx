import React from 'react'

export default function Map() {
    return (
        <div className="overflow-hidden w-full h-[350px] ">
            <div id="my-map-canvas" className="h-full w-full max-w-full">
                <iframe className="w-full h-full border-0" src="https://www.google.com/maps/embed/v1/search?q=bole+medhane&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
            </div>
        </div>
    )
}
