import { useEffect, useRef, useState } from 'react';
import { TypeNewArrival } from '../../types';
import { icons } from '../../../utils/Helpers';
import { Link } from 'react-router';

const newArrivals: TypeNewArrival[] = [
  {
    _id: "1",
    name: "Stylish Jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish Jacket"
      }
    ]
  },
  {
    _id: "2",
    name: "Stylish Jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Stylish Jacket"
      }
    ]
  },
  {
    _id: "3",
    name: "Stylish Jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
        altText: "Stylish Jacket"
      }
    ]
  },
  {
    _id: "4",
    name: "Stylish Jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Stylish Jacket"
      }
    ]
  },
  {
    _id: "5",
    name: "Stylish Jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?random=5",
        altText: "Stylish Jacket"
      }
    ]
  },
  {
    _id: "6",
    name: "Stylish Jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?random=6",
        altText: "Stylish Jacket"
      }
    ]
  },
  {
    _id: "7",
    name: "Stylish Jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?random=7",
        altText: "Stylish Jacket"
      }
    ]
  }
];

export const NewArrivals = () => {

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container?.scrollLeft;
      const constRightScrollable = (leftScroll + container.clientWidth) < container.scrollWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(constRightScrollable);
    }

    // console.log({
    //   scrollLeft: container?.scrollLeft,
    //   clientWidth: container?.clientWidth,
    //   containerWidth: container?.scrollWidth,
    //   offsetLeft: scrollRef.current?.offsetLeft
    // });
  };

  const handleOnMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current?.offsetLeft);
    setScrollLeft(scrollRef.current?.scrollLeft);
  };

  const handleOnMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleOnMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const currentX = e.pageX - scrollRef.current?.offsetLeft;
    const scrollAmount = currentX - startX;
    scrollRef.current.scrollLeft = scrollLeft - scrollAmount;
    // console.log({
    //   currentX,
    //   scrollAmount,
    //   scrollLeft,
    //   startX,
    //   pageX: e.pageX
    // })
  };

  const onButtonScroll = (direction: string) => {
    const scrollAmount = direction == "left" ? -300 : 300;
    scrollRef.current?.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      // updateScrollButtons();
      return () => {
        container.removeEventListener("scroll", updateScrollButtons);
      }
    }
  }, []);

  return (
    <section className='tw:py-16 tw:px-4 tw:lg:px-0'>
      <div className='tw:container tw:mx-auto tw:text-center tw:mb-10 tw:relative'>
        <h2 className='tw:text-3xl tw:text-black tw:font-bold tw:mb-4'>Explore New Arrivals</h2>
        <p className='tw:text-lg tw:text-gray-600 tw:mb-[65px]'>Discover the latest styles staright off the runway, freshly added to keep your wardrobr on the cutting edge of fashion.</p>

        {/* Scrool Buttons */}
        <div className="tw:absolute tw:right-0 tw:bottom-[-50px] tw:flex tw:space-x-2">
          <button
            onClick={() => onButtonScroll("left")}
            disabled={!canScrollLeft}
            className={`tw:p-2 tw:rounded tw:border tw:cursor-pointer ${canScrollLeft ? "tw:bg-white tw:text-black" : "tw:bg-gray-200 tw:text-gray-400"}`}
          >
            <icons.KeyboardArrowLeft />
          </button>
          <button
            onClick={() => onButtonScroll("right")}
            disabled={!canScrollRight}
            className={`tw:p-2 tw:rounded tw:border tw:cursor-pointer ${canScrollRight ? "tw:bg-white tw:text-black" : "tw:bg-gray-200 tw:text-gray-400"}`}
          >
            <icons.KeyboardArrowRight />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className={`tw:container tw:mx-auto tw:overflow-x-hidden tw:flex tw:space-x-6 tw:relative ${isDragging ? "tw:cursor-grabbing" : "tw:cursor-grab"}`}
        onMouseDown={handleOnMouseDown}
        onMouseUp={handleOnMouseUpOrLeave}
        onMouseLeave={handleOnMouseUpOrLeave}
        onMouseMove={handleOnMouseMove}
      >
        {
          newArrivals.map((item) => (
            <div
              key={item._id}
              className='tw:min-w-[100%] tw:sm:min-w-[50%] tw:lg:min-w-[30%] tw:relative'
            >
              <img
                src={item.images[0].url}
                alt={item.images[0].altText || item.name}
                className="tw:w-full tw:h-[500px] tw:object-cover tw:rounded-lg"
                draggable={false}
              />
              <div className="tw:absolute tw:bottom-0 tw:left-0 tw:right-0 tw:opacity-75 tw:backdrop-blur-md tw:text-white tw:p-4 tw:rounded-b-lg">
                <Link
                  to={`/product/${item._id}`}
                  className='tw:block'
                >
                  <h4 className='tw:font-medium'>{item.name}</h4>
                </Link>
                <p className='tw:mt-1'>{item.price}</p>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
};
