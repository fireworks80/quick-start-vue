const BASEURL = '/api';

export default {
  PAGESIZE: 5,
  FETCH: BASEURL + '/contacts',
  ADD: BASEURL + '/contacts',
  UPDATE: BASEURL + '/contacts/${no}',
  FETCHONE: BASEURL + '/contacts/${no}',
  DELETE: BASEURL + '/contacts/${no}',
  UPDATEPHOTO: BASEURL + '/contacts/${no}/photo'
}