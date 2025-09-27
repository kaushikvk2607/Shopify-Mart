import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'snfov5gv',
  dataset: 'production',
  apiVersion: '2024-02-04',
  useCdn: true,
  token: 'skGsNP2driv7XXMjlwyVdd05qGGrjIxUbA41WiMCrF2t9ZZ4i6J9eDTNxaGT366aAThKS6r2vBlQQRnzvLCFaqQiHaJqfWZqe1Ozrcod6HT14Ri8fMh2Z8yG4IIhorWYQuvkdPHixwfAWuFenK5gtOu4ikR5CTnrK9ljg1bDey8DdT5PlxSq'
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);