import MessageDisplay from "./MessageDisplay";


interface UserMessage{
  role:string,
  content:string
};
interface MessagesDisplayProps{
  userMessages:UserMessage[]
};
function MessagesDisplay({userMessages}:MessagesDisplayProps) {
  return (
    <div className="messages-display">
      {userMessages.map((userMessage,i)=>{
        return <MessageDisplay message={userMessage} key={i}/>
      })}
    </div>
  )
}

export default MessagesDisplay;