const BASEURL = '/api';

export default {
  PAGESIZE: 5,
  FETCHCONTACT: 'fetchContact',
  ADDCONTACT: 'addContact',
  UPDATECONTACT: 'updateContact',
  FETCHLINK: `${BASEURL}/contacts`,
  ADDLINK: `${BASEURL}/contacts`,
  UPDATELINK: BASEURL + '/contacts/${no}',
  FETCHONELINK: BASEURL + '/contacts/${no}',
  DELETELINK: BASEURL + '/contacts/${no}',
  UPLOADPHOTOLINK: BASEURL + '/contacts/${no}/photo'
};