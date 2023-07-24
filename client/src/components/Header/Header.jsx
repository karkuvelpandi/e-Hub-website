import React from 'react'
import './Header.css'
import { Slider } from '../../components/Slider/Slider'
import slider1 from "../../assets/Slider/slider1.jpg"
import slider2 from "../../assets/Slider/slider2.jpg"
import slider3 from "../../assets/Slider/slider3.jpg"
const Header = () => {
   const imageArray = [slider1, slider2, slider3]
   // const [imagesLoaded, setImagesLoaded] = useState(false);

   // useEffect(() => {
   //    // Preload images
   //    const preloadImages = async () => {
   //       await Promise.all(
   //          imageArray.map((imageSrc) => {
   //             return new Promise((resolve, reject) => {
   //                const image = new Image();
   //                image.onload = resolve;
   //                image.onerror = reject;
   //                image.src = imageSrc;
   //             });
   //          })
   //       );
   //       setImagesLoaded(true);
   //    };

   //    preloadImages();
   // }, []);
   const imageChild = () => {
      return imageArray.map((img, index) => (
         <div key={index}>
            <img key={index} src={img} alt="" />
            <div className=" bg-gradient-to-b from-transparent to-white absolute inset-0" />
         </div>
      ))
   }
   return <>
      <div className='relative'>
         <Slider dots arrow dotColor='blue' sliderClass="" dotContainerClass='flex gap-10 absolute top-1/2 left-1/2'>
            {imageChild()}
         </Slider>
      </div>
   </>
}
export default Header