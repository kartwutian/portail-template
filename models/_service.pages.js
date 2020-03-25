import request from '../utils/request';


export function getDemo(params) {
  return request(
    '/api/ftts/user/login',
    {
      method: 'GET',
      data: params,
    },
    false,
  );
}

export function postTest(params) {
  return request('/app/ajaxLogout', {
    method: 'post',
    data: params,
  });
}
