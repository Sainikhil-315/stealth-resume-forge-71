import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface ProjectImageCarouselProps {
  images: string[];
  projectTitle: string;
}

const ProjectImageCarousel = ({ images, projectTitle }: ProjectImageCarouselProps) => {
  return (
    <motion.div
      className="relative group overflow-hidden rounded-lg premium-border hover-lift"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-video bg-gradient-to-br from-accent to-muted rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`${projectTitle} screenshot ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
      </Carousel>
    </motion.div>
  );
};

export default ProjectImageCarousel;