import InputField from "../InputField";
import { useState } from "react";
import RadioButton from "../RadioButton";
import Checkbox from "../CheckBox";
import SelectMenu from "../SelectMenu";
import Button from "../Button";
import PostCard from "../PostCard";
import { useLoaderData, useNavigate } from "react-router-dom";
import { faV } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useEffect} from "react";


export default function EditCard() {
    
    const questions = useLoaderData();
    const navigate = useNavigate();

    const [question, setQuestion] = useState(questions.question)
    const [description, setDescription] = useState(questions.description)
    const [type, setType] = useState(questions.typeId)
    const [favourite, setFavourite] = useState(questions.favourite)
    const [category, setCategory] = useState(questions.categoryId)
    const [level, setLevel] = useState(questions.levelId)
    console.log(question, description, type, favourite, category, level)

    useEffect(() => {
        document.title = `Edit - ${question}`;  
      }, []);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        fetch(`/questions/${questions.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                question,
                description,
                typeId: type,
                categoryId: category,
                levelId: level,
                favourite,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(() => {
                navigate(`/questions/${questions.id}`); // Navigate to the updated question page
                toast.success("You successfully edited the card!");
            })
            .catch((error) => {
                console.error("Error updating card:", error);
                toast.error("Failed to update the card.");
            });
    };
    return(
        <form 
            className="flex flex-col gap-6 text-dark_blue font-sans text-sans text-body  px-10 py-4 h-[1000px]"
            onSubmit={handleSubmit}
            >
            <PostCard 
                question={question}
                description={description}
                type={type}
                favourite={favourite}
                category = {category}
                level = {level}
                onChangeQuestion={setQuestion}
                onChangeDescription={setDescription}
                onChangeType={setType}
                onChangeFavourite={setFavourite}
                onChangeCategory={setCategory}
                onChangeLevel={setLevel}
                />
              <br/>
              <Button
                text="Update Card"
                tcolor="text-paper_white"
                bgcolor="bg-tomato"
                size="text-body"
                paddingy="py-2"
                paddingx="px-6"
                type="submit" // Triggers the form's onSubmit event
            />
            
        </form>
    )
}