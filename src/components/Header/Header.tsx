import { FunctionComponent, HTMLAttributes } from 'react' 
import { RouteComponentProps, withRouter } from 'react-router-dom' 

import './Header.css' 

interface Props extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {}

//Headbar with a button redirecting to the homepage
const HeaderComponent: FunctionComponent<Props> = ({ history }) => {
  
  const homepage = () => {history.push('/')}

  return (
    <div className='Header HVR'>
      <button onClick={homepage}>
          Home 
      </button>
    </div>
  ) 
}


export const Header = withRouter(HeaderComponent)
