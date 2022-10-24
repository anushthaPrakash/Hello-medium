import {
    createImageUrlBuilder,
    createCurrentUserHook,
    createClient
} from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url'

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2022-09-19',
    useCdn: process.env.NODE_ENV === 'production'
}

export const sanityClient = createClient(config);

const builder = imageUrlBuilder(sanityClient)

export const urlFor = (source) => builder.image(source);

export const useCurrentUser = createCurrentUserHook(config);