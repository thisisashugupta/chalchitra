import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

function CarouselWrapper({children}: {children: React.ReactNode}) {

  return (
        <Carousel
            // opts={{
            //   align: "start",
            // }}
            className="w-full"
        >
            <CarouselContent>
              {children}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
  )
}

export default CarouselWrapper