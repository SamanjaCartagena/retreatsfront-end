import { useState } from "react";

const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const sliderStyles={
        height:'100%',
        position:'relative',    
        borderRadius:'10px',
        overflow:'hidden'
    }   
    const slideStyles={
        width:'100%',
        height:'100%',
        borderRadius:'10px',
        backgroundPosition:'center',
        backgroundSize:'cover',
        backgroundImage:`url(${slides[currentIndex]})`
    }
    const leftArrowStyle={
        position:'absolute',
        top:'55%',  
        transform:'translate(0,-50%)',
        left:'32px',
        fontSize:'25px',    
        color:'#fff',
        zIndex:1,
        cursor:'pointer',
        userSelect:'none'
    }
    const rightArrowStyle={
        position:'absolute',
        top:'55%',      
        transform:'translate(0,-50%)',
        right:'32px',
        fontSize:'25px',
        color:'#fff',
        zIndex:1,
        cursor:'pointer',
        userSelect:'none'
    }
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }   
    const dotsContainerStyles={
        display:'flex',
        justifyContent:'center',
        
    }
    const dotStyles={
        margin:'0 3px',
        cursor:'pointer',
        fontSize:'20px'
        }
  
    return <div style={sliderStyles} >
        <div style={leftArrowStyle} onClick={goToPrevious}>◀</div>
        <div style={rightArrowStyle} onClick={goToNext}>▶</div>
    <div style={slideStyles}></div>
   
     </div>
      
}

export default ImageSlider;