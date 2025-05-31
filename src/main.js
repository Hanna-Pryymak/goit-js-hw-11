import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();
  clearGallery();
  showLoader();

  try {
    const searchQuery = event.target.elements['search-text'].value.trim();

    if (!searchQuery) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please enter a search term.',
        position: 'topRight',
        timeout: 3000,
      });
      return;
    }

    const response = await getImagesByQuery(searchQuery);

    if (response.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 3000,
      });
      return;
    }

    createGallery(response.hits);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again!',
      position: 'topRight',
      timeout: 3000,
    });
  } finally {
    hideLoader();
  }
}
