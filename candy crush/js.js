document.addEventListener('DOMContentLoaded', () => {
const grid = document.querySelector('.grid')
const scoreDisplay =document.getElementById('score')
const width =8 
const squares =[]
let score =0

const candyColors =[
    'url(images/red-candy.png)',
    'url(images/yellow-candy.png)',
    'url(images/orange-candy.png)',
    'url(images/purple-candy.png)',
    'url(images/green-candy.png)',
    'url(images/blue-candy.png)'
]

//create board
function createBoard() {
  for(let i=0 ;i< width*width;i++){
      const square = document.createElement('div')
      square.setAttribute('draggable' ,true)
      square.setAttribute('id',i)
      let randomColor =Math.floor(Math.random() * candyColors.length)
      square.style.backgroundImage=candyColors[randomColor]
      grid.appendChild(square)
      squares.push(square)
  }
}
createBoard()

//drag the candies
let colorDragged
let colorReplaced
let squareIdDragged
let squareIdReplaced

squares.forEach(square => square.addEventListener('dragstart' ,dragstart))
squares.forEach(square => square.addEventListener('dragend' ,dragend))
squares.forEach(square => square.addEventListener('dragover' ,dragover))
squares.forEach(square => square.addEventListener('dragenter' ,dragenter))
squares.forEach(square => square.addEventListener('dragleave' ,dragleave))
squares.forEach(square => square.addEventListener('drop' ,dragdrop))

function dragstart(){
    colorDragged= this.style.backgroundImage
    squareIdDragged=parseInt(this.id)
    console.log(colorDragged)
    console.log(this.id ,'dragstart')
}
function dragend(){
    console.log(this.id ,'dragend')

    let validMoves = [
        squareIdDragged -1 ,
        squareIdDragged -width ,
        squareIdDragged +1 ,
        squareIdDragged +width
    ]

    let validMove = validMoves.includes(squareIdReplaced)

    if(squareIdReplaced && validMove){
        squareIdReplaced=null
    } else if(squareIdReplaced && !validMove){
        squares[squareIdReplaced].style.backgroundImage=colorReplaced
        squares[squareIdDragged].style.backgroundImage =colorDragged
    }else  squares[squareIdDragged].style.backgroundImage =colorDragged

}
function dragover(e){
    e.preventDefault()
    console.log(this.id ,'dragover')
}
function dragenter(e){
    e.preventDefault()
    console.log(this.id ,'dragenter')
}
function dragleave(){
    console.log(this.id ,'dragleave')
}
function dragdrop(){
    colorReplaced = this.style.backgroundImage
    squareIdReplaced =parseInt(this.id)
    squares[squareIdDragged].style.backgroundImage=colorReplaced
    squares[squareIdReplaced].style.backgroundImage=colorDragged

    console.log(this.id ,'dragdrop')

}


function moveDown(){

    for(i=0; i<55; i++){
        if(squares[i+width].style.backgroundImage === ''){
            squares[i+width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage = ''
            const firstRow =[0,1,2,3,4,5,6,7]
            const isFirstRow =firstRow.includes(i)
            if(isFirstRow && squares[i].style.backgroundImage === ''){
                let randomColor =Math.floor(Math.random() * candyColors.length)
                squares[i].style.backgroundImage = candyColors[randomColor]
            }

        }
        
    }
}

function checkRowForFour(){
    for (i=0; i<60; i++){
        let rowOfFour = [i, i+1, i+2,i+3]
        let decidedColor= squares[i].style.backgroundImage 
        const isBlank = squares[i].style.backgroundImage === ''

        const notValid =[5,6 ,7 ,14, 15, 21,22,23,29, 30 ,31,37,38,39 ,45,46,47,53,54,55]
        if (notValid.includes(i)) continue
       
        if(rowOfFour.every(index => squares[index].style.backgroundImage===decidedColor && !isBlank)){
            score += 4
            scoreDisplay.innerHTML=score
            rowOfFour.forEach( index => {
                squares[index].style.backgroundImage =''
            }

            )
        }
    }
}
checkRowForFour()

function checkColumnForFour(){
    for (i=0; i<47; i++){
        let columnOfFour = [i, i+width, i+width*2,i+width*3]
        let decidedColor= squares[i].style.backgroundImage 
        const isBlank = squares[i].style.backgroundImage === ''
       
        if(columnOfFour.every(index => squares[index].style.backgroundImage===decidedColor && !isBlank)){
            score += 4
            scoreDisplay.innerHTML=score
            columnOfFour.forEach( index => {
                squares[index].style.backgroundImage =''
            }

            )
        }
    }
}

checkColumnForFour()


function checkRowForThree(){
    for (i=0; i<61; i++){
        let rowOfThree = [i, i+1, i+2]
        let decidedColor= squares[i].style.backgroundImage 
        const isBlank = squares[i].style.backgroundImage === ''

        const notValid =[6 ,7 ,14, 15, 22, 30 ,31,38,39 ,46,47,45,55]
        if (notValid.includes(i)) continue
        
        if(rowOfThree.every(index => squares[index].style.backgroundImage===decidedColor && !isBlank)){
            score += 3
            scoreDisplay.innerHTML=score
            rowOfThree.forEach( index => {
                squares[index].style.backgroundImage =''
            }

            )
        }
    }
}
checkRowForThree()

function checkColumnForThree(){
    for (i=0; i<47; i++){
        let columnOfThree = [i, i+width, i+width*2]
        let decidedColor= squares[i].style.backgroundImage 
        const isBlank = squares[i].style.backgroundImage === ''
        
        if(columnOfThree.every(index => squares[index].style.backgroundImage===decidedColor && !isBlank)){
            score += 3
            scoreDisplay.innerHTML=score
           
            columnOfThree.forEach( index => {
                squares[index].style.backgroundImage =''
            }

            )
        }
    }
}

checkColumnForThree()







window.setInterval(function(){
   
    
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
    moveDown()
    
}, 100)

})