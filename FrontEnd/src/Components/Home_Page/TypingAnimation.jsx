import React from 'react'
import { TypeAnimation } from 'react-type-animation'

export default function TypingAnimation( {color}) {

    const codeblock = [`<<!DOCTYPEhtml>>\n<html>\n<head>\n<title>Example</title>\n<linkrel="stylesheet"href="style.css">\n</head>\n<body>\n<h1>\n<ahref="/">Header</a>\n</h1>`, 4000, ""]
    console.log(color);

    return (
        <div className={` flex justify-center font-mono md:text-[17px] text-[13px] gap-2`}>
            <div className="flex-col flex text-pure-greys-300">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className={`flex flex-col gap-1 w-[90%] ${color ? "text-yellow-300": "text-pink-200"}`}>
                <TypeAnimation
                  sequence={codeblock}
                  repeat={Infinity}
                  style={
                      {
                          whiteSpace: "pre-line",
                          display:"block"
                      }
                  }
                  omitDeletionAnimation={true}
                  cursor={true}
                  className='w-[90%]'
                />
            </div>
              
        </div>
    )
}
