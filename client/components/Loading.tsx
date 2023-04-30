import { useAppSelector } from "../hooks/redux";

function Loading() {
  const displayLoading = useAppSelector((state => state.loading)) 

  return (
    <div className="loading-container">
      <img className="loading-gif" src='/client/assets/otto.gif'></img>
    </div>
  )
}

export default Loading