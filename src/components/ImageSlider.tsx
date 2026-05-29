import { useState } from "react";
import './ImageModal.css';
const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const sliderStyles={
        
        position:'relative',    
        top:'60px',
        borderRadius:'10px',
        height:'700px',
        margin:'0 auto',
    }   
    const slideStyles={
        width:'100%',
        height:'100%',
        borderRadius:'10px',
        backgroundPosition:'center',
        backgroundSize:'100% 100%',
        backgroundRepeat:'no-repeat',
        backgroundImage:`url(${slides[currentIndex]})`
    }
    const leftArrowStyle={
        position:'absolute',
        top:'55%',  
        transform:'translate(0,-50%)',
        left:'32px',
        fontSize:'25px',    
        color:'white',
        opacity:'0.8',
        backgroundColor:'black',
        borderRadius:'50%',
        padding:'10px',
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
        color:'white',
        opacity:'0.8',
        backgroundColor:'black',
        borderRadius:'50%',
        padding:'10px',
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
  
  
    return <div style={sliderStyles} className="max-w-4xl h-full relative md:w-full lg:w-full justify-center items-center">
        <div style={leftArrowStyle} onClick={goToPrevious}>◀</div>
        <div style={rightArrowStyle} onClick={goToNext}>▶</div>
    <div style={slideStyles} className="w-full h-full"></div>
   
     </div>
      
}

export default ImageSlider;