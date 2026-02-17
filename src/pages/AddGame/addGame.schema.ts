import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GAME_ENGINES, GIF_MEME_EXTENSION, GIF_MEME_TYPE, IMAGE_MEME_EXTENSION, IMAGE_MEME_TYPE, MAX_FILE_SIZE_GIF, MAX_FILE_SIZE_THUMBNAIL } from "../../constants/game.constants";

const addGameSchema = z.object({
  name: z.string().min(3).max(20),
  description: z.string().min(30).max(3000),
  gameEngine: z.enum(GAME_ENGINES),
  category: z.string().min(1, "Category is required"),
  mobileSupport: z.boolean(),
  multiplayer: z.boolean(),
  gif: z.any()
    .optional()
    .refine((file) => !file || file instanceof File, "Must be a file")
    .refine((file) => !file || file.size <= MAX_FILE_SIZE_GIF, "File must be under 10MB")
    .refine((file) => {
      if (!file) return true;
      const ext = file.name.split(".").pop()?.toLowerCase();
      return (file.type && GIF_MEME_TYPE.includes(file.type)) || (ext && GIF_MEME_EXTENSION === 'gif')
    }, "Unsupported file type"),
  thumbnail: z.any()
    .refine((file) => file instanceof File, "At least one file is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE_THUMBNAIL, "File must be under 10MB")
    .refine((file) => {
      const ext = file?.name.split(".").pop()?.toLowerCase();
      return (file?.type && IMAGE_MEME_TYPE.includes(file.type)) || (ext && IMAGE_MEME_EXTENSION.includes(ext))
    }, "Unsupported file type"),
  gameFile: z.string()
    .min(1, "Game URL is required")
    .url("Please enter a valid URL"),
});

export type AddGameValues = z.infer<typeof addGameSchema>;

export const useAddGameForm = () => {
  return useForm<AddGameValues>({
    resolver: zodResolver(addGameSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      mobileSupport: false,
      multiplayer: false
    }
  });
};