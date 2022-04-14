import React from 'react';
import { AppRoute } from '@ice/stark';
import { MicroAppTypes } from '../index.d';

export const CoolHtmlRoute = (app: MicroAppTypes, globalData: any) => (
  <AppRoute
    key={app.key}
    activePath={app.activePath}
    name={app.name}
    exact
    sandbox
    rootId="cool-micro-container"
    props={{ ...globalData, ...app.props }}
    entry={app.src}
    umd={app.umd || false}
  />
);

export const CoolUrlRoute = (app: MicroAppTypes, globalData: any) => (
  <AppRoute
    key={app.key}
    activePath={app.activePath}
    title={app.name}
    sandbox
    hashType={app.hashType}
    name={app.key}
    rootId="cool-micro-container"
    props={{ ...app.props, ...globalData }}
    url={app.src}
    umd={app.umd || false}
  />
);
