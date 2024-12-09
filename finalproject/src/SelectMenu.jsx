export default function SelectMenu(props){

    return (
      <div className=" ">
        <span className="pr-6">
            {props.label}
        </span>
        <br/>
        <select
          className=" text-dark_blue font-sans text-sans text-body  py-2 px-2 w-[100%] bg-paper_white h-[40px] rounded-tr-[30px] border border-dark_blue"
          name={props.name}
          value={props.value}
          defaultValue={0}
          onChange = {(event)=>{
            props.onChange(event.target.value);
          }}>
          {props.options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
           ))}
       </select>
    </div>

    )
}