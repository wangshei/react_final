import Card from "../Card";
import { useLoaderData, useNavigate } from "react-router-dom";
import '../index.css';
import Button from "../Button";
import { toast } from "react-toastify";


export default function CardDetail(props) {
    const question = useLoaderData();
    console.log(question)
    const navigate = useNavigate();
    if (!question) {
        return <div>Loading...</div>;
    }

    return(
        <div  className="h-[1000px]">
             <div>
                    <Card
                    question={question.question}
                    description={question.description}
                    level={question.level}
                    typeId={question.typeId} 
                    categoryId={question.categoryId}
                    />
                </div>
           <div className="flex justify-center gap-8">
            <Button
                 text="Edit" 
                 link={`/questions/${question.id}/edit`} 
                 size = "text-body"
                 tcolor="text-paper_white"
                 paddingy = "py-1"
                 paddingx = "px-6"
                 bgcolor = "bg-tomato"
                />
           <button type="button" className =" " onClick={()=>{
            const isDeleteConfirmed = window.confirm("Are you sure you want to delete this card?")
            // if cancel - false
            if(isDeleteConfirmed){
            fetch(`/questions/${question.id}`,{
            method:"DELETE",
            }).then(()=>{
            navigate("/");
            toast.success("You Successfully deleted a card!")

            })}else{
                navigate(`/questions/${question.id}`);
            }
        }}>
             <Button
                 text="Delete" 
                 link={"/" }
                 size = "text-body"
                 tcolor="text-paper_white"
                 paddingy = "py-2"
                 paddingx = "px-6"
                 bgcolor = "bg-pensive_blue"
                />
        </button>
           
           </div>
           
        </div>
       
    )
}