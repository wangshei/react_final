
import React, { useEffect} from "react";

export default function About() {
    useEffect(() => {
        document.title = "About - No Small Talk";  
      }, []);

    return(
        <div className="font-sans text-nav text-dark_blue h-[1000px]">
            <span>This is a game inspired by We're Not Really Strangers Card Game</span>
            <div>
            <h2  className="font-heading text-subtitle h-[100%] mt-10">Rules</h2>
            <div className="ml-4 mt-4">
                <li>Take turns answering</li>
                <li>Be truthful about your answer</li>
                <li>Be nice</li>
                <li>Add good questions</li>
                <li>Have fun with your friends</li>
            </div>
            
           
            </div>
        </div>
    )
}