import React from 'react'

export default function Map() {
    return (
        <div className="h-[380px] w-full overflow-hidden border-t-2 border-ink">
            <div id="my-map-canvas" className="h-full w-full max-w-full">
                <iframe
                    className="h-full w-full border-0 grayscale contrast-110"
                    loading="lazy"
                    title="Ya Ride office location"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4900.580395168735!2d38.768931768847764!3d9.016598306444429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2set!4v1784159315206!5m2!1sen!2set"
                ></iframe>
            </div>
        </div>
    )
}
