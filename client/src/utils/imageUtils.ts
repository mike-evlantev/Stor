import { IImage } from "../types/IImage";

export const getDisplayImageUrl = (images: IImage[]): string | undefined => {
    // assumes images are sorted in order
    return images?.find(i => i.url)?.url;
}