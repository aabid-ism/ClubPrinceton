import logo from './triangle logo.png'

function Button({value}){
    return (
    <button
        className="
            text-amber-700
            py-1 
            px-5 
            hover:bg-orange-200 
            border-2 
            border-amber-700 
            rounded-lg"
    >{value}</button>
    )
}

function ReachOut(){
    return (<div className="flex flex-row justify-evenly p-3 divide-x-2">
    <div>
        <Button value={"Follow"}></Button>
    </div>
    <div>
        <Button value={"Contact"}></Button>
    </div>
    <div>
        <Button value={"Apply"}></Button>
    </div>
</div>);
}

function InfoPanel(){
    return (
        <div className='flex flex-row justify-evenly text-lg'>
            <div className='p-2'>
                <img src={logo} alt=""></img>
            </div>
            <InfoNode fieldName={"Followers"} fieldValue={100}></InfoNode>
            <InfoNode fieldName={"Likes"} fieldValue={100}></InfoNode>
            <InfoNode fieldName={"Posts"} fieldValue={100}></InfoNode>
        </div>
    );
}

function InfoNode({fieldName, fieldValue}){
    return (
        <div className='flex flex-col p-2 items-center justify-center'>
            <div className='text-black text-l font-medium'>{fieldName}</div>
            <div className='text-black text-l font-medium'>{fieldValue}</div>
        </div>
    );
}

function ClubDescription({props}){
    return (
        <div className='text-black text-l font-medium'>
            <p>
                {props.description}
            </p>
        </div>
    );
}


export default function MainBubble({mainDescription}){
    const mainBubbleProps = {description: mainDescription}
    return (
        <div className="bg-orange-100 mx-auto w-120 rounded-lg">
            <div className="flex flex-col divide-y-2 divide-amber-700 p-3">
                <InfoPanel></InfoPanel>
                <ReachOut></ReachOut>
            </div>
            <div className='flex flex-col items-center'>
                <ClubDescription props={mainBubbleProps}/>
            </div>
            
        </div>
    );
}