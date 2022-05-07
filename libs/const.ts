import React from 'react';

export enum Style {
  headerHeight = 60,
  headerSubHeight = '100px',
  footerHeight = '100px',
  mobileWidth = '680px',
  mobileWidthNum = 680,
  mobileMenuHeight = 45,
  mobileLowerMenuHeight = 38,
}

interface IMenuInfo {
  name: string;
  path: string;
  lower?: {
    name: string;
    path: string;
  }[];
}

export interface IBody {
  [key: string]: any;
}

export enum BannerImage {
  business = '/img/banner1.jpg',
  technology = '/img/banner1.jpg',
  contact = '/img/banner3.jpg',
}

export const MenuInfo: IMenuInfo[] = [
  {
    name: 'Business',
    path: '/business',
    lower: [
      {
        name: 'Our purpose',
        path: '/business/our-purpose',
      },
      {
        name: 'Team',
        path: '/business/team',
      },
      {
        name: 'News',
        path: '/business/news',
      },
    ],
  },
  {
    name: 'Technology',
    path: '/technology',
    lower: [
      {
        name: 'Platform link',
        path: '/technology/platform-link',
      },
      {
        name: 'LiLac-DSP',
        path: '/technology/lilac-dsp',
      },
      {
        name: 'LiLac-QSP',
        path: '/technology/lilac-qsp',
      },
    ],
  },
  {
    name: 'Contact',
    path: '/contact',
    lower: [
      {
        name: 'Business contact',
        path: '/contact/business-contact',
      },
      {
        name: 'Location',
        path: '/contact/location',
      },
    ],
  },
];

export interface TeamProps {
  data: {
    group: {
      level: string;
      members: {
        id: string;
        nameKr: string;
        nameEn: string;
        admission: string;
        email: string;
      }[];
    }[];
    detail: {
      id: string;
      image?: string;
      level: string;
      nameKr: string;
      nameEn: string;
      admission: string;
      email: string;
      education: {
        date: string;
        detail: string;
      }[];
      career: {
        date: string;
        detail: string;
      }[];
      github?: string;
      scholar?: string;
      link?: string;
    };
  };
}

export interface PurposeProps {
  images?: string[];
  contents: string[];
  active?: boolean;
  notAction?: boolean;
  ref: any;
}
