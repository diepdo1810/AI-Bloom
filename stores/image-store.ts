import { create } from "zustand";
import { persist } from "zustand/middleware";

// interface image
interface ImageData {
  id: string;
  prompt: string;
  pattern?: string;
  image: string | null;
  generating?: boolean;
}

interface ImageStore {
  images: Record<string, ImageData>;

  // create method
  create: (data: {
    id: string;
    prompt: string;
    image: null;
    pattern: string;
    generating: boolean;
  }) => string;

  // Update method
  addImage: (id: string, imageUrl: string) => void;
  getImageById: (id: string) => ImageData | null;
  updateImage: (id: string, data: Partial<ImageData>) => void;
  removeImage: (id: string) => void;
}

export const useImageStore = create<ImageStore>()(
  persist(
    (set, get) => ({
      images: {},

      // create
      create: (data) => {
        const id = data.id;
        set((state) => ({
          images: {
            ...state.images,
            [id]: {
              id,
              prompt: data.prompt,
              pattern: data.pattern,
              image: data.image,
              generating: data.generating,
            },
          },
        }));

        return id;
      },

      // add image
      addImage: (id, imageUrl) => {
        set((state) => {
          const existingImage = state.images[id];

          if (!existingImage) return state;

          return {
            images: {
              ...state.images,
              [id]: {
                ...existingImage,
                image: imageUrl,
                generating: false,
              },
            },
          };
        });
      },

      // get image by id
      getImageById: (id) => {
        return get().images[id] || null;
      },

      // Update image
      updateImage: (id, data) => {
        set((state) => {
          const existingImage = state.images[id];

          if (!existingImage) return state;

          return {
            images: {
              ...state.images,
              [id]: {
                ...existingImage,
                ...data,
              },
            },
          };
        });
      },

      // Remove image
      removeImage: (id) => {
        set((state) => {
          const { [id]: removed, ...rest } = state.images;
          return { images: rest };
        });
      },
    }),
    {
      name: "image-store",
    },
  ),
);
