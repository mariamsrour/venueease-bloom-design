import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ImageGalleryProps {
  images: string[];
  venueName: string;
}

export default function ImageGallery({ images, venueName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div
          className="col-span-4 md:col-span-2 md:row-span-2 cursor-pointer overflow-hidden rounded-lg group relative"
          onClick={() => setSelectedImage(0)}
        >
          <img
            src={images[0]}
            alt={`${venueName} - Main`}
            className="w-full h-full object-cover aspect-video md:aspect-[4/3] group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>

        {images.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className="cursor-pointer overflow-hidden rounded-lg group relative aspect-video"
            onClick={() => setSelectedImage(index + 1)}
          >
            <img
              src={image}
              alt={`${venueName} - ${index + 2}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
        ))}

        {images.length > 1 && (
          <Button
            variant="secondary"
            className="absolute bottom-4 right-4 z-10"
            onClick={() => setSelectedImage(0)}
          >
            View all {images.length} photos
          </Button>
        )}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>

            {selectedImage !== null && (
              <>
                <img
                  src={images[selectedImage]}
                  alt={`${venueName} - ${selectedImage + 1}`}
                  className="max-w-full max-h-full object-contain"
                />

                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 text-white hover:bg-white/20"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 text-white hover:bg-white/20"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-8 w-8" />
                    </Button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
                      {selectedImage + 1} / {images.length}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
