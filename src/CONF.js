const BASEURL = '/api';

export default {
  PAGESIZE: 5,
  FETCHCONTACT: 'fetchContact',
  FETCH: `${BASEURL}/contacts`,
  ADD: `${BASEURL}/contacts`,
  UPDATE: BASEURL + '/contacts/${no}',
  FETCHONE: BASEURL + '/contacts/${no}',
  DELETE: BASEURL + '/contacts/${no}',
  UPLOADPHOTO: BASEURL + '/contacts/${no}/photo'
};