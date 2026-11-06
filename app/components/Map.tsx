import React from 'react'

export default function Map() {
    return (
        <div className="h-[380px] w-full overflow-hidden border-t-2 border-ink">
            <div id="my-map-canvas" className="h-full w-full max-w-full">
                <iframe
                    className="h-full w-full border-0 grayscale contrast-110"
                    loading="lazy"
                    title="Ya Ride office location"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d246.28064181259126!2d38.76985265800953!3d9.018961165296938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2set!4v1793983260187!5m2!1sen!2set"
                    referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
            </div>
        </div>
    )
}
