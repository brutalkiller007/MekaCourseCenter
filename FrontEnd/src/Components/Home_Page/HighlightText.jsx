import React from "react";

const HighlightText = ({text}) => {
    return(
        <span className="bg-gradient-to-r from-[#00BFFF] to-caribbeangreen-50 text-transparent bg-clip-text">
            {text}
        </span>
    )
}

export default HighlightText;