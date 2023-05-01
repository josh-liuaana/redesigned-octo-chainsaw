import otto from '../public/otto.gif'

function Loading() {
  return (
    <div className="loading-container">
      <img className="loading-gif" src={otto} alt='otto loading gif'></img>
    </div>
  )
}

export default Loading