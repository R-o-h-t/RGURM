import { generatePath } from "react-router" 

//first ID
let ID = 0

export class Product{
    id : number
    name : string
    desc : string
    img : string
    option : string
    models : string[]
    textures : string[]
    categories : string[]
    path : string

  constructor(
    name: string, 
    desc: string, 
    img: string, 
    option: string, 
    models: string[], 
    textures : string[],
    categories: string[]
) {
    this.id = ID
    ID++
    this.name = name
    this.desc = desc
    this.img = img
    this.option = option
    this.models = models
    this.textures = textures
    this.categories = categories
    //set the path with the new id as valid
    this.path = generatePath("/product/:id", { id: this.id,})
  }
    
}

// an array with all the product 

export const products = [
    new Product(
    'Hoodie',
    'female white Hoodie',
    '/Images/0.png',
    ' - - -',
    ['/3DModels/cloth1/hi/cloth1.gltf'],
    [],
    ['female','top']),
    new Product(
    'Dress',
    'female dress',
    '/Images/1.png',
    ' 45£',
    ['/3DModels/dress1/hi/dress1.gltf'],
    [],
    ['female','dress']),
    new Product(
    'Scotish kilt',
    'Scotish kilt',
    '/Images/2.png',
    ' ‏‏‎ ‎',
    ['/3DModels/kilt1/hi/kilt1.gltf','/3DModels/MaleTop/hi/MaleTop.gltf'],
    ['/3DModels/kilt1/hi/Kilt 1.png','/3DModels/kilt1/hi/Kilt 2.png','/3DModels/kilt1/hi/Kilt 3.png','/3DModels/kilt1/hi/Kilt 4.png','/3DModels/kilt1/hi/Kilt 5.png','/3DModels/kilt1/hi/Kilt 6.png','/3DModels/kilt1/hi/Kilt 7.png','/3DModels/kilt1/hi/Kilt 8.png','/3DModels/kilt1/hi/Kilt 9.png','/3DModels/kilt1/hi/Kilt 10.png','/3DModels/kilt1/hi/Kilt 11.png','/3DModels/kilt1/hi/Kilt 12.png',],
    ['top','male','scotland']),
          
]