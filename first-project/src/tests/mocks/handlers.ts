import { http, HttpResponse } from 'msw';
import { UNSPLASH_BASE_URL } from '@/constants';
import type { CardResponse, CardData } from '@/types/interfaces';

export const mockCards: CardResponse[] = [
  {
    id: 'IPtSV340-j4',
    created_at: '2023-04-28T12:46:16Z',
    description:
      'A beautiful and ancient spring fed canyon which weaves its way through 400-meter-tall towers of granite, sandstone and basalt, before plunging into the Gulf of Aqaba | Shiʻb Mūsá – NEOM, Saudi Arabia.',
    alt_description: 'a man walking down a dirt road next to a mountain',
    urls: {
      raw: 'https://images.unsplash.com/photo-1682685797703-2bb22dbb885b?ixid=M3w2NTc5MDd8MXwxfHNlYXJjaHwxfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0',
      full: 'https://images.unsplash.com/photo-1682685797703-2bb22dbb885b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NTc5MDd8MXwxfHNlYXJjaHwxfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=85',
      regular:
        'https://images.unsplash.com/photo-1682685797703-2bb22dbb885b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MXwxfHNlYXJjaHwxfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1682685797703-2bb22dbb885b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MXwxfHNlYXJjaHwxfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=400',
      thumb:
        'https://images.unsplash.com/photo-1682685797703-2bb22dbb885b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MXwxfHNlYXJjaHwxfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=200',
    },
    links: {
      self: 'https://api.unsplash.com/photos/a-man-walking-down-a-dirt-road-next-to-a-mountain-IPtSV340-j4',
      html: 'https://unsplash.com/photos/a-man-walking-down-a-dirt-road-next-to-a-mountain-IPtSV340-j4',
      download:
        'https://unsplash.com/photos/IPtSV340-j4/download?ixid=M3w2NTc5MDd8MXwxfHNlYXJjaHwxfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA',
    },
    likes: 788,
    user: {
      id: 'mYizSrdJkkU',
      username: 'neom',
      name: 'NEOM',
      bio: 'NEOM is a region in northwest Saudi Arabia. It will be a destination and a home for people who dream big and want to be part of building a new model for exceptional livability, creating thriving businesses and reinventing environmental conservation.',
    },
  },
  {
    id: 'pVATCBKLH8w',
    created_at: '2017-05-15T00:08:16Z',
    description: 'On the road to the home of giants, Mt Aoraki National Park.',
    alt_description: 'snow capped mountans',
    urls: {
      raw: 'https://images.unsplash.com/photo-1494806812796-244fe51b774d?ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHwyfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0',
      full: 'https://images.unsplash.com/photo-1494806812796-244fe51b774d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHwyfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=85',
      regular:
        'https://images.unsplash.com/photo-1494806812796-244fe51b774d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHwyfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1494806812796-244fe51b774d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHwyfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=400',
      thumb:
        'https://images.unsplash.com/photo-1494806812796-244fe51b774d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHwyfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=200',
    },
    links: {
      self: 'https://api.unsplash.com/photos/snow-capped-mountans-pVATCBKLH8w',
      html: 'https://unsplash.com/photos/snow-capped-mountans-pVATCBKLH8w',
      download:
        'https://unsplash.com/photos/pVATCBKLH8w/download?ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHwyfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA',
    },
    likes: 138,
    user: {
      id: 'M2z2MXSoXNg',
      username: 'aleksdahlberg',
      name: 'Aleks Dahlberg',
      bio: 'Someone from nowhere.',
    },
  },
  {
    id: '1527pjeb6jg',
    created_at: '2017-10-02T00:59:57Z',
    description: null,
    alt_description: 'aerial photo of foggy mountains',
    urls: {
      raw: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHwzfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0',
      full: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHwzfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=85',
      regular:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHwzfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHwzfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=400',
      thumb:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHwzfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=200',
    },
    links: {
      self: 'https://api.unsplash.com/photos/aerial-photo-of-foggy-mountains-1527pjeb6jg',
      html: 'https://unsplash.com/photos/aerial-photo-of-foggy-mountains-1527pjeb6jg',
      download:
        'https://unsplash.com/photos/1527pjeb6jg/download?ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHwzfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA',
    },
    likes: 2578,
    user: {
      id: 'ZiFGZw8fnHE',
      username: 'samferrara',
      name: 'Samuel Ferrara',
      bio: "No matter where beauty exists – that's where I want to go. I use still images and timelapses to tell stories. I've spent time in New Zealand, the United States, and now permanently settled in Ticino, Switzerland with my wife and daughter.",
    },
  },
  {
    id: 'Bkci_8qcdvQ',
    created_at: '2016-06-01T23:13:24Z',
    description: 'travelyukon, Wet mountain valley',
    alt_description: 'green mountain across body of water',
    urls: {
      raw: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw0fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0',
      full: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw0fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=85',
      regular:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw0fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw0fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=400',
      thumb:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw0fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=200',
    },
    links: {
      self: 'https://api.unsplash.com/photos/green-mountain-across-body-of-water-Bkci_8qcdvQ',
      html: 'https://unsplash.com/photos/green-mountain-across-body-of-water-Bkci_8qcdvQ',
      download:
        'https://unsplash.com/photos/Bkci_8qcdvQ/download?ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw0fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA',
    },
    likes: 7682,
    user: {
      id: 'j7YsMEZljNw',
      username: 'kalenemsley',
      name: 'Kalen Emsley',
      bio: null,
    },
  },
  {
    id: 'U2AwijfUNS4',
    created_at: '2019-08-24T20:37:56Z',
    description: null,
    alt_description: 'trees near mountain',
    urls: {
      raw: 'https://images.unsplash.com/photo-1566679056462-2075774c8c07?ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw1fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0',
      full: 'https://images.unsplash.com/photo-1566679056462-2075774c8c07?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw1fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=85',
      regular:
        'https://images.unsplash.com/photo-1566679056462-2075774c8c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw1fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1566679056462-2075774c8c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw1fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=400',
      thumb:
        'https://images.unsplash.com/photo-1566679056462-2075774c8c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw1fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=200',
    },
    links: {
      self: 'https://api.unsplash.com/photos/trees-near-mountain-U2AwijfUNS4',
      html: 'https://unsplash.com/photos/trees-near-mountain-U2AwijfUNS4',
      download:
        'https://unsplash.com/photos/U2AwijfUNS4/download?ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw1fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA',
    },
    likes: 130,
    user: {
      id: '3lSuVVnKu-8',
      username: 'hixenia',
      name: 'Kseniia Rastvorova',
      bio: 'The world through old Canon EOS Elan 📸',
    },
  },
  {
    id: '9wg5jCEPBsw',
    created_at: '2016-02-03T10:50:17Z',
    description:
      'A snow covered Ama Dablam with blue skies and clouds in Sagarmatha national park in Nepal, on the way to Everest Base Camp.',
    alt_description:
      'aerial photography of mountain range covered with snow under white and blue sky at daytime',
    urls: {
      raw: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw2fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0',
      full: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw2fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=85',
      regular:
        'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw2fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw2fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=400',
      thumb:
        'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw2fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=200',
    },
    links: {
      self: 'https://api.unsplash.com/photos/aerial-photography-of-mountain-range-covered-with-snow-under-white-and-blue-sky-at-daytime-9wg5jCEPBsw',
      html: 'https://unsplash.com/photos/aerial-photography-of-mountain-range-covered-with-snow-under-white-and-blue-sky-at-daytime-9wg5jCEPBsw',
      download:
        'https://unsplash.com/photos/9wg5jCEPBsw/download?ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw2fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA',
    },
    likes: 2581,
    user: {
      id: 'aZCHDihg63o',
      username: 'sepoys',
      name: 'Rohit Tandon',
      bio: 'All for the love of photography!',
    },
  },
];

export const mockCardData: CardData = {
  id: 'IPtSV340-j4',
  imageUrl:
    'https://images.unsplash.com/photo-1682685797703-2bb22dbb885b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MXwxfHNlYXJjaHwxfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  title: 'A MAN WALKING DOWN A DIRT ROAD NEXT TO A MOUNTAIN',
  description: 'Author: NEOM (@neom)',
};

export const incompleteCardData: CardData = {
  id: 'test-id',
  imageUrl:
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw2fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  title: '',
  description: 'Test description',
};

export const handlers = [
  http.get(`${UNSPLASH_BASE_URL}/search/photos`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');

    if (query === 'simulated-error-404') {
      return new HttpResponse(null, { status: 404 });
    }

    if (query === 'simulated-error-500') {
      return new HttpResponse(null, { status: 500 });
    }

    if (query === 'simulated-empty-response') {
      return HttpResponse.json({});
    }

    if (query === 'simulated-invalid-data') {
      return HttpResponse.json({
        invalid: 'structure',
        noResults: 'property',
      });
    }

    return HttpResponse.json({
      results: mockCards,
      total: mockCards.length,
      total_pages: 1,
    });
  }),

  http.get(`${UNSPLASH_BASE_URL}/photos`, () => {
    return HttpResponse.json(mockCards);
  }),
];

export const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
