import InputField from "../InputField";
import { useState } from "react";
import RadioButton from "../RadioButton";
import Checkbox from "../CheckBox";
import SelectMenu from "../SelectMenu";
import Button from "../Button";
import PostCard from "../PostCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function AddCard() {
    const [question, setQuestion] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState()
    const [favourite, setFavourite] = useState(false)
    const [category, setCategory] = useState()
    const [level, setLevel] = useState()
    let [maxId, setMaxId] = useState()
    const [validationErrors, setValidationErrors] = useState({});

    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        if (!question || question.trim() === "") {
            errors.question = "Question is required.";
        }
        if (!description || description.trim() === "") {
            setDescription(" ")
        }
        if (type === undefined) {
            errors.type = "Type is required.";
        }
        if (category === undefined) {
            setCategory(0)
        }
        if (level === undefined) {
            setLevel(0)
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    };


    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        const promise = fetch("/questions")
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    maxId = data.length-1;
                    setMaxId(maxId);
                }
                return maxId
            })
        promise.then((maxId)=>{
            fetch(`/questions/`, {
                method: "POST",
                body: JSON.stringify({
                    id:maxId+1,
                    question:question,
                    description:description,
                    typeId: type,
                    categoryId: category,
                    levelId: level,
                    favourite:favourite,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(() => {
                    navigate(`/`); // Navigate to the updated question page
                    toast.success("You successfully added the card!");
                })
                .catch((error) => {
                    console.error("Error adding card:", error);
                    toast.error("Failed to add the card.");
                });
        }
        )
        
        
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
                typeError = {validationErrors.type}
                inputError = {validationErrors.question}
                />
              <br/>
             
            <Button
                 text="Add Card" 
                 size = "text-body"
                 tcolor="text-paper_white"
                 paddingy = "py-2"
                 paddingx = "px-6"
                 bgcolor = "bg-tomato"
                />
        </form>
    )
}