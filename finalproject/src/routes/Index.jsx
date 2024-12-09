import { useLoaderData } from "react-router-dom";
import CardList from "../CardList";
import '../index.css';
import { toast } from "react-toastify";
import Button from "../Button";
import React, { useEffect} from "react";


export default function Index() {
  const questions = useLoaderData();

  useEffect(() => {
    document.title = "Home - No Small Talk";  
  }, []);

  return (
    <div className="pb-12">

     
      <div className="flex justify-between items-center pt-4">
      <h1 className="font-heading text-title text-dark_blue">Home</h1>
        <span className="flex items-center gap-4">
        <Button  
            text="Play" 
            link="/start" 
            size = "text-body"
            tcolor="text-paper_white"
            paddingy = "py-2"
            paddingx = "px-6"
            />
        <Button  
            text="Add Card" 
            link="/add" 
            size = "text-body"
            tcolor="text-paper_white"
            paddingy = "py-2"
            paddingx = "px-6"
            bgcolor = "bg-pensive_blue"
            />
        </span>
        
      </div>
      <div  className="pt-4">
        {questions.map((question) => {
            console.log(question)
          return <CardList 
                  question={question} 
                  key={question.id} 
                  onUpdateFavourite={(question) => {
                    // Update the backend
                    fetch(`/questions/${question.id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ favourite:question.favourite }),
                    }).then(() => {
                      toast.success("You Successfully edited a post!")
                    })
                  }} 
                  />;
        })}
      </div>
    </div>
  );
}
