import type { CardDetailResponse } from '@/types/interfaces';
import { UNSPLASH_API_KEY, UNSPLASH_BASE_URL, FETCH_ERRORS } from '@/constants';
import defaultAvatar from '@/assets/icons/default-avatar.png';
import { isEmptyResponse, isValidCardDetailResponse } from '@/types/guards';
import defaultImage from '@/assets/images/default-image.png';
import type { Translations } from '@/locale';

export const fetchCardDetails = async (
  cardId: string,
  translations: Translations
): Promise<CardDetailResponse> => {
  const urlParameters = new URLSearchParams({
    client_id: UNSPLASH_API_KEY,
  });

  const path = `/photos/${cardId}?${urlParameters.toString()}`;
  const response = await fetch(`${UNSPLASH_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`${FETCH_ERRORS.HTTP_ERROR} ${response.status}`);
  }

  const data: unknown = await response.json();

  if (isEmptyResponse(data)) {
    throw new Error(FETCH_ERRORS.EMPTY_RESPONSE);
  }

  if (!isValidCardDetailResponse(data)) {
    throw new Error(FETCH_ERRORS.INVALID_CARD_DETAIL_DATA);
  }

  const { id, urls, alt_description, description, user, likes, links, downloads, views } = data;

  const cardDetail: CardDetailResponse = {
    id: id,
    imageUrl: urls?.regular || defaultImage,
    title: (alt_description || translations.cardDetail.untitled).toUpperCase(),
    description: description || translations.cardDetail.noDescription,
    author: {
      name: user?.name || translations.cardDetail.unknownAuthor,
      username: user?.username || translations.cardDetail.unknownUsername,
      bio: user?.bio || translations.cardDetail.noBio,
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
