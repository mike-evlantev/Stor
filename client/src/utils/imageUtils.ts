import { IImage } from "../types/IImage";

const PLACEHOLDER = "/images/image-placeholder.png";

export const getDisplayImageUrl = (images: IImage[]): string => {
    // assumes images are sorted in order
    return images?.find(i => i.url)?.url ?? PLACEHOLDER;
}

export const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = PLACEHOLDER;
}