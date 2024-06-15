import React from "react";

const Timeline= ({img, title, description}) => {
    return(
        <div className="flex h-[100px] justify-start">
            <div className="flex flex-col justify-center mx-6">
                <img src={img} alt={title} width={20} height={20}></img>
            </div>

             <div className="flex flex-col justify-center text-[18px]">
                <h1 className="font-bold">{title}</h1>
                <p>{description}</p>
             </div>
        </div>
    )
}

export default Timeline;