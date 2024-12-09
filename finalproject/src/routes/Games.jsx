import Card from "../Card";
import { useLoaderData, useNavigate } from "react-router-dom";
import '../index.css';
import Button from "../Button";
import { toast } from "react-toastify";
import { useState } from 'react';


export default function Games(props) {
    const player = props.player
    const question = props.question
    console.log(question)
    const navigate = useNavigate();
    if (!question) {
        return <div>Loading...</div>;
    }


    return(
        <div  className="h-[1000px]">
             <div>
                    <h1 className="font-heading text-subtitle text-dark_blue mb-4 text-center">
                        Player: {player}
                    </h1>
                    <Card
                    question={question.question}
                    description={question.description}
                    level={question.level}
                    typeId={question.typeId} 
                    categoryId={question.categoryId}
                    />
                </div>
        </div>
        
    )
}