import type { CardDetailResponse } from '@/types/interfaces';
import { UNSPLASH_API_KEY, UNSPLASH_BASE_URL, ERROR_TEXTS, CARD_DETAIL_TEXTS } from '@/constants';
import defaultAvatar from '@/assets/icons/default-avatar.png';
import { isEmptyResponse, isValidCardDetailResponse } from '@/types/guards';
import defaultImage from '@/assets/images/default-image.png';

export const fetchCardDetails = async (cardId: string): Promise<CardDetailResponse> => {
  const urlParameters = new URLSearchParams({
    client_id: UNSPLASH_API_KEY,
  });

  const path = `/photos/${cardId}?${urlParameters.toString()}`;
  const response = await fetch(`${UNSPLASH_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`${ERROR_TEXTS.HTTP_ERROR} ${response.status}`);
  }

  const data: unknown = await response.json();

  if (isEmptyResponse(data)) {
    throw new Error(ERROR_TEXTS.EMPTY_RESPONSE);
  }

  if (!isValidCardDetailResponse(data)) {
    throw new Error(ERROR_TEXTS.INVALID_CARD_DETAIL_DATA);
  }

  const { id, urls, alt_description, description, user, likes, links, downloads, views } = data;

  const cardDetail: CardDetailResponse = {
    id: id,
    imageUrl: urls?.regular || defaultImage,
    title: (alt_description || CARD_DETAIL_TEXTS.UNTITLED).toUpperCase(),
    description: description || CARD_DETAIL_TEXTS.NO_DESCRIPTION,
    author: {
      name: user?.name || CARD_DETAIL_TEXTS.UNKNOWN_AUTHOR,
      username: user?.username || CARD_DETAIL_TEXTS.UNKNOWN_USERNAME,
      bio: user?.bio || CARD_DETAIL_TEXTS.NO_BIO,
      profileImage: user?.profile_image?.medium || defaultAvatar,
    },
    stats: {
      likes: likes || 0,
      downloads: downloads || 0,
      views: views || 0,
    },
    links: {
      html: links?.html || '',
    },
  };

  return cardDetail;
};
