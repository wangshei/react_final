import { useLoaderData} from "react-router-dom";
import { useState } from 'react';
import './index.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons"
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons"
import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function CardList(props) {
    const question = props.question
    const [isFilled, setIsFilled] = useState(props.question.favourite); // Track if the star is filled
    const bgcolor = props.question.typeId == 0 ? "bg-white" : "bg-dark_blue";
    console.log(typeof props.question.typeId, props.question.typeId);


    // if (question.type == 0){
    //     bgcolor = "bg-white"
    //     opacity = "bg-opacity25"
    //     tcolor = "text-dark_blue"
    // } else{
    //     bgcolor = "bg-dark_blue"
    //     opacity = "bg-opacity75"
    //     tcolor = "text-paper_white"
    // }

    return(
        <div className= {`flex items-center font-sans text-body px-10 py-4 rounded-tr-[30px] ${bgcolor} bg-opacity-25 mb-2 border border-dark_blue `}>
        {/* Image */}
        {getImage(question.categoryId)}
  
        {/* Question Text */}
        <Link to={`/questions/${props.question.id}`} className="pl-4  flex-grow">
          {question.question.length > 80
            ? `${question.question.substring(0, 80)}...`
            : question.question}
        </Link>
  
       <div className="flex justify-end space-x-4">
        <Link to={`/questions/${props.question.id}/edit`}>
        <FontAwesomeIcon 
                    icon={faPenToSquare}
                    style={{
                        color: "#3C5364",
                    }} 
                    />
        </Link>
        <Link to={``}>
         
           <button type="button" className ="btn btn-danger" onClick={()=>{
            const isDeleteConfirmed = window.confirm("Are you sure you want to delete this card?")
            // if cancel - false
            if(isDeleteConfirmed){
            fetch(`/questions/${question.id}`,{
            method:"DELETE",
            }).then(()=>{
            toast.success("You Successfully deleted a card!")

            })}
        }}>
            <FontAwesomeIcon 
                    icon={faTrashCan}
                    style={{
                        color: "#3C5364",
                    }} 
                    />
            </button>
        </Link>
        <span>
            <FontAwesomeIcon 
                icon= {faStar}
                style={
                    isFilled ?
                    {
                        color: "#3C5364",
                        stroke: "#3C5364", // Adds outline
                        strokeWidth: "54", // Adjusts outline thickness
                    }:
                    {
                        color: "transparent", // Removes fill
                        stroke: "#3C5364", // Adds outline
                        strokeWidth: "54", // Adjusts outline thickness
                     } 
                 } 
                 onClick={(event) => {
                    setIsFilled(!isFilled)
                    props.onUpdateFavourite({
                        id: question.id,
                        favourite:!question.favourite,
                      }
                      );
                  }}
                />
                </span>
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