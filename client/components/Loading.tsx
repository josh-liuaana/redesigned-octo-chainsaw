// @ts-ignore
import otto from '../public/otto.gif'

function Loading() {
  return (
    <div className="loading-container">
      {/* <img className="loading-gif" src='/otto.gif'></img> */}
      <img className="loading-gif" src={otto}></img>
    </div>
  )
}

export default Loading