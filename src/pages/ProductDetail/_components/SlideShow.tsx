import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { useRef, useState } from 'react';

export default function SlideShow({ thumbnail, images }: { thumbnail: string; images: string[] }) {
    const fullImages = [thumbnail, ...images];
    const ref = useRef<CarouselRef>(null);
    const [indexImage, setindexImage] = useState<number>(0);
    const handleNextThumbnail = () => {
        ref.current?.next();
    };
    const hanlePrevThumbnail = () => {
        ref.current?.prev();
    };
    const onChange = (slide: number) => {
        setindexImage(slide);
    };
    const handleClickImage = (slide: number) => {
        ref.current?.goTo(slide, false);
    };
    return (
        <div>
            <div className='relative'>
                <Carousel beforeChange={onChange} afterChange={onChange} dots={false} ref={ref} draggable infinite>
                    {fullImages?.map((item, index) => (
                        <div key={index}>
                            <div className='flex h-[475px] w-full justify-center'>
                                <img className='rounded-md object-contain' src={item} />
                            </div>
                        </div>
                    ))}
                </Carousel>
                {fullImages.length > 2 && (
                    <>
                        <div
                            onClick={hanlePrevThumbnail}
                            className='absolute top-[50%] left-0 cursor-pointer rounded-sm bg-black px-1 py-2 text-white opacity-50 duration-300 hover:opacity-100'
                        >
                            <LeftOutlined />
                        </div>
                        <div
                            onClick={handleNextThumbnail}
                            className='absolute top-[50%] right-3 cursor-pointer rounded-sm bg-black px-1 py-2 text-white opacity-50 duration-300 hover:opacity-100'
                        >
                            <RightOutlined />
                        </div>
                    </>
                )}
            </div>
            <div className='mt-6 hidden items-center gap-2 sm:flex'>
                {fullImages.map((item, index) => (
                    <div
                        onClick={() => handleClickImage(index)}
                        key={index}
                        className={`flex w-18 cursor-pointer justify-center overflow-hidden rounded-md border-[1px] ${indexImage === index ? 'border-black' : 'border-[#c9c9c9]'} px-2 py-1`}
                    >
                        <img src={item} className='h-16 object-fill' alt='' />
                    </div>
                ))}
            </div>
        </div>
    );
}
