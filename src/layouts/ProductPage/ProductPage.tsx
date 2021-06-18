import React, { FunctionComponent, HTMLAttributes, Suspense } from "react" 
import { RouteComponentProps, withRouter } from "react-router-dom" 
import { Canvas } from '@react-three/fiber' 
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei' 
import { products } from "../../models/product.model"

import './ProductPage.css' 
import { IconButton, Tooltip, withStyles } from "@material-ui/core"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import * as THREE from "three"

interface MatchParams {
 id : string//ID of the Product
}

interface ProductPageProps extends RouteComponentProps<MatchParams>, HTMLAttributes<HTMLDivElement> {}

const ProductPageLayout: FunctionComponent<ProductPageProps> = ({ match }) => {
  const product = products[Number(match.params.id)]
  let isMale = product.categories.includes('male')

  const [open, setOpen] = React.useState(true);
  const [texture, setTexture] = React.useState(product.textures[0]?? '');
  //set both the state of the info panel and the texture/pattern as member of the state 

  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      fab: {
        margin: theme.spacing(2),
      },
      absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
      },
    }),
  );
  const classes = useStyles();

  //Return the given model as a renderable object
  const Model = (props : {model : string}) => {
    const gltf = useGLTF(props.model, true)
    return <primitive object = {gltf.scene} dispose = {null}/>
  }

  //same as Model but used if the model as more than one possible texture/pattern : display the one in the state
  const ModelWithTexture = (props : {model : string}) => {
    const pattern = useTexture(texture)
    const gltf = useGLTF(props.model, true)
    gltf.scene.children[3].traverse((child )=>{
      if((child as THREE.Mesh).isMesh)
      (child as THREE.Mesh).material =  new THREE.MeshBasicMaterial( { map: pattern } );
    })

    return <primitive object = {gltf.scene} dispose = {null}/>
  }

  //return as a group all the model of the product 
  const Models = () => {
    return(
      <group>
        {product.models.map((model,key) => {
          if(key===0 && product.textures.length)
          return(
            <mesh position = { [0,0,0]  } >
              <ModelWithTexture model = {model}/>
            </mesh>
          )
          return(
            <mesh position = { [0,0,0]  } >
              <Model model = {model}/>
            </mesh>
          )
      })}
      </group>
    )
    
  }

  //select the convenient body and return it as a model
  const Body = () => {
    const female = '/3DModels/FBody/hi/FBody.gltf'
    const male = '/3DModels/MBody/hi/MBody.gltf'
    const body = isMale? male : female
    
    return <Model model = {body}/>
  }

  //return the a loading screen (cf css)
  const Loading = () => {
    return(
      <div id="preloader">
        <div id="loader"/>
      </div>
    )
  }

  //variation of the material-ui tooltip to render HTML in it 
  const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

  //return the texture/pattern tab if the product as more than one
  const Textures = () => {
    //as if the product as only one it is specified in the gltf file it is not placed in the array so this one would be empty
    if(product.textures.length)
    return(
      <div className='TexturesPanel'>
        <Typography color="inherit">Patterns :</Typography><br/>
        <div className='Textures'>
          {product.textures.map((texture,key)=>{
            //return each texture as a clickable image applying the texture
            return(
              <img className='texture' src={texture} alt={String(key)} width='50' onClick={()=>{
                setTexture(texture)
              }} />
            )
          })}   
        </div>
     
      </div>
    )
    return(
      <div/>
    )
  }

  return (
    <div className='VRCanvas'>
      {/*the Suspense is needed for useGLTF and render the loading screen while the models are loading*/}
      <Suspense fallback = {<Loading/>}>
        {/*the Canvas is the 3d space on which the model are rendered*/}
        <Canvas camera = { {position :[0, 2, 4], fov : 60} } className='Canvas' >
          {/*the lights*/}
          <pointLight position={[2, 10, 5]} intensity={3}/>
          <pointLight position={[-2, 10, -5]} intensity={2}/>
          
            <group position = { [0,0,0] }>
              <mesh position = { [0,0,0] }>
                <Body/>
              </mesh>
                <Models/>
            </group>
          {/*Orbit control : make the canvas a listener for the control of the camera*/}  
          <OrbitControls/>
        </Canvas>
        {/*the info panel*/}
        <div className='info'>
          {/*close the panel when clicked away*/}
          <ClickAwayListener onClickAway={handleTooltipClose} >
            {/*the content of the info panel, as a tooltip, already open and reacting only on click; title is for the content*/}
            <HtmlTooltip className='info'
            disableFocusListener
            disableHoverListener
            disableTouchListener
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            arrow
            title={
                <React.Fragment>
                  <Typography color="inherit">Controls :</Typography><br/>
                  <b>{'Left Click '}</b>{' Turn the camera around'}<br/><br/>
                  <b>{'Right Click '}</b>{' Move the Camera'}<br/><br/>
                  <b>{'Mouse Wheel '}</b>{' Zoom in/out'}<br/><br/>
                </React.Fragment>
              }
            >
            {/*this is on what the tooltip apply : a IconButton*/}
            <IconButton aria-label="info" >
              {/*with a color and a listener*/}
              <Fab color="primary" className={classes.fab} onClick={handleTooltipOpen}>
                <InfoIcon />
              </Fab>
            </IconButton>
          </HtmlTooltip>
        </ClickAwayListener>
        </div>
        {/*then display the texture panel*/}
        <Textures/>

      </Suspense>

    </div>
  )

}


export const ProductPage = withRouter(ProductPageLayout) 

