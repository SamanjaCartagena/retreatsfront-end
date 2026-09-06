import { useState } from "react";
import './ImageModal.css';
import {ArrowBigLeft, ArrowBigRight, X} from 'lucide-react';


type ImageSliderProps = {
  slides: string[];
  index: number;
  closeSlider: () => void;
};
function ImageSlider({ slides, index, closeSlider }: ImageSliderProps) {
    const [imageIndex, setImageIndex] = useState(index);

     const showPrevImage = () => {
        setImageIndex(index =>{
            if(index==0){
                return slides.length-1;
            }
            else {
                return index-1;
            }
        })
    };

    const showNextImage = () => {
        setImageIndex(index =>{
            if(index==slides.length-1){
                return 0;
            }
            else {
                return index+1;
            }
        }
        )
    };
  return <div style={{width:'100%', height:'100%', position:'relative'}}>
        
        <img src={slides[imageIndex]} alt="slider" className="img-slider-img"/>
        <button className="img-close-btn" onClick={closeSlider} style={{right:'4rem', top:0}}><X/></button>
        <button
        onClick={showPrevImage}
        className="img-slider-btn" style={{left:0}}><ArrowBigLeft /></button>
        <button
        onClick={showNextImage}
        className="img-slider-btn" style={{right:0}}><ArrowBigRight /></button>
    </div>

}

export default ImageSlider;