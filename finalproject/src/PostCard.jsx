import InputField from "./InputField";
import { useState } from "react";
import RadioButton from "./RadioButton";
import Checkbox from "./CheckBox";
import SelectMenu from "./SelectMenu";
import Button from "./Button";

export default function PostCard(props) {
    // const [question, setQuestion] = useState(props.question)
    // const [description, setDescription] = useState(props.description)
    // const [type, setType] = useState(props.type)
    // const [favourite, setFavourite] = useState(props.favourite)
    // const [category, setCategory] = useState(props.category)
    // const [level, setLevel] = useState(props.level)
    const question = props.question
    const description = props.description
    const type = props.type
    const category = props.category
    const level = props.level
    const favourite = props.favourite

    return(
        <div className="flex flex-col gap-6 text-dark_blue font-sans text-sans text-body ">
            <RadioButton
            name="Expecting..."
            options={[
              { value: 0, label: "Answer: Share something personal" },
              { value: 1, label: "Action: Perform the described action" },
            ]}
            value={type}
            onChange={props.onChangeType}
            error = {props.typeError}
          />
            <InputField 
              id = "question" 
              label = "Card Title"
              placeholder = "Put an ask / action"
              value = {question} 
              onChange = {props.onChangeQuestion}
              error = {props.inputError}
              />
            <InputField 
              id = "description" 
              label = "Description"
              placeholder = "If clarification is needed, describe what the card is asking "
              value = {description} 
              onChange = {props.onChangeDescription}
              />
           
          
           <SelectMenu
            id="category"
            label="Card Category"
            name="Category"
            value={category}
            options={[
                { value: 0, label: "Identity" },
                { value: 1, label: "Relationship" },
                { value: 2, label: "Dream" },
                { value: 3, label: "Memories" },
                { value: 4, label: "Secrets" },
            ]}
            onChange={props.onChangeCategory}
        />
        <SelectMenu
            id="level"
            label="Intimacy Level"
            name="level"
            value={level}
            options={[
                { value: 0, label: "Level 1 - Personal introductions" },
                { value: 1, label: "Level 2 - Get to know each other" },
                { value: 2, label: "Level 3 - Deep into the conversation" },
                { value: 3, label: "Level 4 - Proceed with caution" },
            ]}
            onChange={props.onChangeLevel}
        />
         
           <Checkbox  
              id = "favourite" 
              label = "Mark Favourite? "
              value = {favourite} 
              onChange = {props.onChangeFavourite}
              />
              <br/>
            
        </div>
    )
}