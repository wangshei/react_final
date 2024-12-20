import { useLoaderData} from "react-router-dom";
import { useState } from 'react';
import './index.css';
import { Link } from "react-router-dom";

export default function Card(props) {
    const question = props.question
    const description = props.description
    const level = props.level
    // console.log(level)
    const category = props.categoryId
    const bgcolor = props.typeId == 0 ?  "bg-white" : "bg-dark_blue";
    const opacity = props.typeId == 0? "bg-opacity-25" : "bg-opacity-75";
    const tcolor = props.typeId == 0? "text-dark_blue" : "text-paper_white";
    // console.log(props)
    return(
        <div className={`relative ${bgcolor} ${opacity} text-center rounded-tr-[60px] h-[450px] m-[5%] mx-[10%] p-[60px] `}>
          <div className= "flex justify-center items-center">
          {getImage(category)}
          </div>
          <div className="flex flex-col top-[100px] left-0 right-0`">
            <div className={`${tcolor} font-heading text-subtitle my-[24px] mx-[60px]`}>
                {question}
            </div>
            <div className={`${tcolor} font-sans text-nav`}>
                {description}
          </div>
          </div>
         
          <div className={`text-pensive_blue font-sans text-body absolute bottom-6 left-0 right-0`}>
             Level {level.id+1} : {level.description}
          </div>
        </div>
    )
}


function getImage(category){
    if(category == 0){
        return <img src = "/images/identity.svg"/>
    }
    else if(category == 1){
        return <img src = "/images/relationship.svg"/>
    }
    else if(category == 2){
        return <img src = "/images/dream.svg"/>
    }
    else if(category == 3){
        return <img src = "/images/memory.svg"/>
    }
    else if(category == 4){
        return <img src = "/images/secret.svg"/>
    }
}