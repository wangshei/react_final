import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RadioButton from "../RadioButton";
import InputField from "../InputField";
import Button from "../Button";
import Checkbox from "../CheckBox";
import Games from "./Games";
import Card from "../Card";
import CardList from "../CardList";
import { toast } from "react-toastify";

export default function StartGame() {
    const [level1, setLevel1] = useState(true);
    const [level2, setLevel2] = useState(true);
    const [level3, setLevel3] = useState(true);
    const [level4, setLevel4] = useState(true);
    const [favourite, setFavourite] = useState(false);
    const [player, setPlayer] = useState(2);
    const [validationErrors, setValidationErrors] = useState({});
    let [maxId, setMaxId] = useState()
    let [usedQuestion, setUsedQuestion] = useState([])
    const [start, setStart] = useState(false)
    const [loadedQuestion, setLoadedQuestion] = useState()
    let [currentPlayer, setCurrentPlayer] = useState(1)
    const [stop, setStop] = useState(false)
    const [filteredQuestions, setFilteredQuestions] = useState([])

    const navigate = useNavigate(); // Hook to navigate programmatically

    const validateForm = () => {
        const errors = {};
        if (player === undefined || player < 2) {
            errors.player = "Player number must be 2 or more.";
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    };

    const fetchQuestion = (event) => {
        
        fetch("/questions")
        .then((response) => response.json())
        .then((data) => {
            if (data.length === 0) {
                throw new Error("No questions available.")

            };
            const filteredData = data.filter((question) => {
                const isNotUsed = !usedQuestion.includes(question.id); // Exclude used questions
                const isFavourite = !favourite || question.favourite === true; // Filter favourite only if marked
                return isNotUsed && isFavourite;
            });
            console.log(filteredData)
            if (filteredData.length === 0){
                alert("No more questions available!");
                setStop(true)
                return;
            }
            const randomId = Math.floor(Math.random() * filteredData.length);
            const selectedQuestion = filteredData[randomId];
            setUsedQuestion((prevQuestions) => {
                    const newArray = prevQuestions.slice(); // Create a shallow copy
                    newArray.push(selectedQuestion.id);     // Add the id of the new question
                    return newArray;                        // Return the updated array
        });

            fetch(`/questions/${selectedQuestion.id}?_expand=level`)
                .then((response) => response.json())
                .then((data) => {
                   
                    setLoadedQuestion(data);
                    setStart(true);
                })
                .catch((error) => console.error("Error fetching question:", error));
        })
        .catch((error) => console.error("Error fetching questions:", error));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        fetchQuestion()
        // Fetch questions and pick a random question
        
    };

    const handleNext = (event) => {
        if (currentPlayer != player){
            setCurrentPlayer(currentPlayer+1)
        }else(
            setCurrentPlayer(1)
        )
        fetchQuestion()
    }

    const fetchAndFilterQuestions = () => {
        fetch("/questions")
            .then((response) => response.json())
            .then((data) => {
                // Filter questions based on the usedQuestion array and dynamically add the favourite condition
                const filtered = data.filter((question) => {
                    // Ensure the question is in usedQuestion
                    const isUsed = usedQuestion.includes(question.id);
                    // Add the favourite filter conditionally
                    const isFavourite = !favourite || question.favourite === true;
                    return isUsed && isFavourite;
                });
    
                setFilteredQuestions(filtered); // Store filtered questions in state
            })
            .catch((error) => console.error("Error fetching questions:", error));
    };
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     if (!validateForm()) return;
    //     fetch("/questions")
    //         .then((response) => response.json())
    //         .then((data) => {
    //              maxId = data.length > 0 ? data.length - 1 : 0;

    //             // Generate random question ID
    //              setQuestionId(Math.floor(Math.random() * (maxId + 1)));
    //              fetch(`/questions/${questionId}`) 
    //              .then((response) => response.json())
    //              .then((data)=>setLoadedQuestion(data))
    //              console.log(loadedQuestion)

    //             // Navigate to the game page
    //             setStart(true)
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching questions:", error);
    //         });
        
         
    // };

    return (
        start == false ? (
        <form className="h-[1000px]" onSubmit={handleSubmit}>
            <h1 className="font-heading text-subtitle text-dark_blue mb-4">
                Start Game
            </h1>
            <div className="flex flex-col gap-6 text-dark_blue font-sans text-sans text-body">
                <RadioButton
                    name="Favourite"
                    options={[
                        { value: 0, label: "All Cards" },
                        { value: 1, label: "Favourite" },
                    ]}
                    value={favourite}
                    onChange={(newFavourite) => setFavourite(newFavourite)}
                />
                <InputField
                    id="player"
                    label="Player Number"
                    placeholder="2"
                    value={player}
                    onChange={(newPlayer) => setPlayer(Number(newPlayer))}
                    error={validationErrors.player}
                />
                {/* <div>
                    Intimacy Level
                    <Checkbox
                        id="level1"
                        label="Level 1"
                        value={level1}
                        onChange={() => setLevel1(!level1)}
                    />
                    <Checkbox
                        id="level2"
                        label="Level 2"
                        value={level2}
                        onChange={() => setLevel2(!level2)}
                    />
                    <Checkbox
                        id="level3"
                        label="Level 3"
                        value={level3}
                        onChange={() => setLevel3(!level3)}
                    />
                    <Checkbox
                        id="level4"
                        label="Level 4"
                        value={level4}
                        onChange={() => setLevel4(!level4)}
                    />
                </div> */}
                <br />
                <Button
                    text="Start Game"
                    size="text-body"
                    tcolor="text-paper_white"
                    paddingy="py-2"
                    paddingx="px-6"
                    bgcolor="bg-tomato"
                    type="submit"
                />
            </div>
        </form>):(
            stop == false ?
            // <Games 
            //     favourite = {favourite}
            //     level1 = {level1}
            //     level2 = {level2}
            //     level3 = {level3}
            //     level4 = {level4}
            //     player = {player}
            //     question = {loadedQuestion}
            // />
            (<div className=" text-dark_blue mb-4 text-center h-[1000px]">
            <h1 className="font-heading text-subtitle">
                        Player: {currentPlayer}
                    </h1>
            <Card
                    question={loadedQuestion.question}
                    description={loadedQuestion.description}
                    level={loadedQuestion.level}
                    typeId={loadedQuestion.typeId} 
                    categoryId={loadedQuestion.categoryId}
            />
             <Button
                 text="Next" 
                 size = "text-body"
                 tcolor="text-paper_white"
                 paddingy = "py-2"
                 paddingx = "px-6"
                 bgcolor = "bg-tomato"
                 onClick = {handleNext}
                />
            <Button
                 text="Stop" 
                 size = "text-body"
                 tcolor="text-paper_white"
                 paddingy = "py-2"
                 paddingx = "px-6"
                 bgcolor = "bg-pensive_blue"
                 onClick = {()=> {setStop(true)}}
                />
            </div>):(
                
                    
                        <div className="h-[1000px]">
                            <div className="font-heading text-subtitle text-dark_blue mb-4">
                                Game Ended
                            </div>
                           
                            
                            {filteredQuestions.length > 0 ? (
                                filteredQuestions.map((question) => (
                                    <CardList
                                        question={question}
                                        key={question.id}
                                        onUpdateFavourite={(updatedQuestion) => {
                                            // Update the backend
                                            fetch(`/questions/${updatedQuestion.id}`, {
                                                method: "PATCH",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({ favourite: updatedQuestion.favourite }),
                                            })
                                                .then(() => {
                                                    toast.success("You successfully updated a card!");
                                                })
                                                .catch((error) => {
                                                    console.error("Error updating favourite:", error);
                                                });
                                        }}
                                    />
                                ))
                            ) : (
                                <div>No questions to display</div>
                            )}
                            <br/>
                             <Button
                                tcolor="text-paper_white"
                                bgcolor="bg-pensive_blue"
                                size="text-body"
                                paddingy="py-2"
                                paddingx="px-1"
                                text = "Show Questions"
                                onClick={fetchAndFilterQuestions}
                            />
                               
                        </div>
                    
                
                // usedQuestion.map((questionId) => {
                //     console.log(questionId)
                //     if (questionId.length > 0){
                //         return (
                //             <div className="h-[1000px]">
                //                 <div className="font-heading text-subtitle text-dark_blue mb-4 ">
                //                     Game Ended
                //                </div>
                //                 <CardList 
                //                     question={question} 
                //                     key={question.id} 
                //                     onUpdateFavourite={(question) => {
                //                     // Update the backend
                //                     fetch(`/questions/${question.id}`, {
                //                         method: "PATCH",
                //                         headers: { "Content-Type": "application/json" },
                //                         body: JSON.stringify({ favourite:question.favourite }),
                //                     }).then(() => {
                //                         toast.success("You Successfully edited a post!")
                //                     })
                //                     }} 
                //                     />;
                //             </div>
                //             )
                //     }else{
                //         return <div className="font-heading text-subtitle text-dark_blue mb-4 h-[1000px]">
                //             Game Ended
                //         </div>
                //     }
                    
                // })
            )
           
        )
    );
}


// import SelectMenu from "../SelectMenu"
// import { useState } from "react"
// import RadioButton from "../RadioButton"
// import InputField from "../InputField"
// import Button from "../Button"
// import { use } from "react"
// import Games from "./Games"
// import Checkbox from "../CheckBox"

// export default function StartGame() {
//     const [level, setLevel] = useState()
//     const [level1, setLevel1] = useState(true)
//     const [level2, setLevel2] = useState(true)
//     const [level3, setLevel3] = useState(true)
//     const [level4, setLevel4] = useState(true)
//     const [favourite, setFavourite] = useState(false)
//     const [player, setPlayer] = useState(2)
//     const [validationErrors, setValidationErrors] = useState({});
//     const [start, startGame] = useState(false)

//     const validateForm = () => {
//         const errors = {};
//         if (level1 == false && level2 == false && level3 == false && level4 == false) {
//             errors.level = "At least 1 level has to be selected";
//         }
//         if (player === undefined || player < 2) {
//             errors.player = "Player number must be 2 or more.";
//         }
//         setValidationErrors(errors);
//         return Object.keys(errors).length === 0; // Return true if no errors
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault(); // Prevent default form submission behavior
//         if (!validateForm()) {
//             return; // Stop submission if validation fails
//         } else{
//             startGame(true)
//         }
//     };
//     return(
//         start == false ? (
//         <form 
//             className="h-[1000px]"
//             onSubmit={handleSubmit}
//             >
//              <h1 className="font-heading text-subtitle text-dark_blue mb-4">Start Game</h1>
//              <div className="flex flex-col gap-6 text-dark_blue font-sans text-sans text-body">
                    
//                      <RadioButton
//                         name="Favourite"
//                         options={[
//                         { value: 0, label: "All Cards" },
//                         { value: 1, label: "Favourite" },
//                         ]}
//                         value={favourite}
//                         onChange={(favourte)=>setFavourite(favourite)}
//                     />
//                      <InputField 
//                         id = "player" 
//                         label = "Player Number"
//                         placeholder = "2"
//                         value = {player} 
//                         onChange = {(player)=>setPlayer(player)}
//                         error = {validationErrors.player}
//                         />
                    
//                     <div>
//                     Intimacy Level
//                     <Checkbox  
//                         id = "level1" 
//                         label = "Level 1 "
//                         value = {level1} 
//                         onChange = {(level1)=>setLevel1(!level1)}
//                     />
//                     <Checkbox  
//                         id = "level2" 
//                         label = "Level 2 "
//                         value = {level2} 
//                         onChange = {(level2)=>setLevel2(!level2)}
//                     />
//                     <Checkbox  
//                         id = "level3" 
//                         label = "Level 3 "
//                         value = {level3} 
//                         onChange = {(level3)=>setLevel3(!level3)}
//                     />
//                     <Checkbox  
//                         id = "level4" 
//                         label = "Level 4 "
//                         value = {level4} 
//                         onChange = {(level4)=>setLevel4(!level4)}
//                         error = {validationErrors.level}
//                     />
//                     </div>
//              <br/>
//              <Button
//                  text="Start Game" 
//                  size = "text-body"
//                  tcolor="text-paper_white"
//                  paddingy = "py-2"
//                  paddingx = "px-6"
//                  type="submit"
//                  bgcolor = "bg-tomato"
//                 />
//             </div>
//         </form>):(
//             <Games 
//                 favourite = {favourite}
//                 level1 = {level1}
//                 level2 = {level2}
//                 level3 = {level3}
//                 level4 = {level4}
//             />
//         )
//     )
// }