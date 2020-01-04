/* eslint-disable import/prefer-default-export */
import Service from './Service';

export const pingGET = () => {
  return Service.successResponse({
    pong: true,
  });
};
